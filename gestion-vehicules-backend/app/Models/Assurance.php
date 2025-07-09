<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Assurance extends Model
{
    protected $fillable = [
        'vehicule_id', 'numero_contrat', 'assureur',
        'date_debut', 'date_fin', 'prix', 'notes', 'traitee'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'traitee' => 'boolean'
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    // Nouvelle méthode pour les alertes
    public static function getAlertes()
    {
        $now = Carbon::now();
        $dateLimite = $now->copy()->addDays(30);

        return self::with('vehicule')
            ->where('traitee', false)
            ->where('date_fin', '<=', $dateLimite)
            ->orderBy('date_fin')
            ->get()
            ->map(function ($assurance) use ($now) {
                $joursRestants = $now->diffInDays($assurance->date_fin, false);
                
                return [
                    'id' => $assurance->id,
                    'type' => 'assurance',
                    'titre' => $joursRestants < 0 ? 'Assurance expirée' : 'Assurance à renouveler',
                    'message' => sprintf(
                        "L'assurance %s du véhicule %s %s (%s) %s le %s",
                        $assurance->numero_contrat,
                        $assurance->vehicule->marque,
                        $assurance->vehicule->modele,
                        $assurance->vehicule->immatriculation,
                        $joursRestants < 0 ? 'a expiré' : 'expire',
                        $assurance->date_fin->format('d/m/Y')
                    ),
                    'date_echeance' => $assurance->date_fin->format('Y-m-d'),
                    'jours_restants' => $joursRestants,
                    'urgence' => self::getNiveauUrgence($joursRestants),
                    'vehicule_id' => $assurance->vehicule_id
                ];
            });
    }

    private static function getNiveauUrgence(int $joursRestants): string
    {
        if ($joursRestants < 0) return 'expiree';
        if ($joursRestants <= 3) return 'critique';
        if ($joursRestants <= 7) return 'haute';
        if ($joursRestants <= 15) return 'moyenne';
        return 'basse';
    }
}
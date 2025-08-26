<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entretien extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicule_id',
        'type_entretien',
        'description',
        'date_prevue',
        'date_reelle',
        'cout',
        'kilometrage',
        'statut',
        'notes'
    ];

    protected $casts = [
        'date_prevue' => 'date',
        'date_reelle' => 'date',
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    public static function typesEntretien()
    {
        return [
            'Vidange',
            'Contrôle technique',
            'Pneumatiques',
            'Freinage',
            'Climatisation',
            'Batterie',
            'Carrosserie',
            'Autre'
        ];
    }

    public static function statuts()
    {
        return [
            'planifié' => 'Planifié',
            'effectué' => 'Effectué',
            'annulé' => 'Annulé',
            'reporté' => 'Reporté'
        ];
    }
}
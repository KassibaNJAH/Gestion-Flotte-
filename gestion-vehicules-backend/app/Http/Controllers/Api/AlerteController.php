<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assurance;
use App\Models\Vehicule;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AlerteController extends Controller
{
    // Configuration des seuils d'alerte
    private const JOURS_AVANT_EXPIRATION = 30;
    private const URGENCE_CRITIQUE = 3;
    private const URGENCE_ELEVEE = 7;
    private const URGENCE_MOYENNE = 15;

    /**
     * Récupère les assurances nécessitant une alerte
     */
    public function getAlertesAssurances(): JsonResponse
    {
        try {
            $dateActuelle = Carbon::now();
            $dateLimite = $dateActuelle->copy()->addDays(self::JOURS_AVANT_EXPIRATION);

            // Requête optimisée avec jointure
            $assurances = Assurance::select('assurances.*')
                ->with('vehicule')
                ->join('vehicules', 'assurances.vehicule_id', '=', 'vehicules.id')
                ->where('assurances.traitee', false)
                ->whereBetween('assurances.date_fin', [
                    $dateActuelle->startOfDay()->toDateTimeString(),
                    $dateLimite->endOfDay()->toDateTimeString()
                ])
                ->orderBy('assurances.date_fin')
                ->get();

            $alertes = $assurances->map(function ($assurance) use ($dateActuelle) {
                return $this->formaterAlerte($assurance, $dateActuelle);
            });

            return response()->json($alertes);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des alertes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Marque une assurance comme traitée
     */
    public function marquerCommeTraitee($id): JsonResponse
    {
        DB::beginTransaction();
        
        try {
            $assurance = Assurance::find($id);

            if (!$assurance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Assurance non trouvée'
                ], 404);
            }

            $assurance->update(['traitee' => true]);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Assurance marquée comme traitée avec succès'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du traitement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Formate une alerte pour la réponse
     */
    private function formaterAlerte(Assurance $assurance, Carbon $dateActuelle): array
    {
        $dateFin = Carbon::parse($assurance->date_fin);
        $joursRestants = $dateActuelle->diffInDays($dateFin, false);
        $urgence = $this->determinerNiveauUrgence($joursRestants);

        return [
            'id' => $assurance->id,
            'vehicule_id' => $assurance->vehicule_id,
            'marque' => $assurance->vehicule->marque,
            'modele' => $assurance->vehicule->modele,
            'immatriculation' => $assurance->vehicule->immatriculation,
            'date_debut' => $this->formatDate($assurance->date_debut),
            'date_fin' => $this->formatDate($assurance->date_fin),
            'jours_restants' => $joursRestants,
            'urgence' => $urgence,
            'message' => $this->genererMessage($assurance, $joursRestants),
            'date_consultation' => now()->toDateTimeString()
        ];
    }

    /**
     * Détermine le niveau d'urgence
     */
    private function determinerNiveauUrgence(int $joursRestants): string
    {
        if ($joursRestants < 0) return 'expiree';
        if ($joursRestants <= self::URGENCE_CRITIQUE) return 'critique';
        if ($joursRestants <= self::URGENCE_ELEVEE) return 'elevee';
        if ($joursRestants <= self::URGENCE_MOYENNE) return 'moyenne';
        return 'basse';
    }

    /**
     * Génère le message d'alerte
     */
    private function genererMessage(Assurance $assurance, int $joursRestants): string
    {
        $vehicule = $assurance->vehicule;
        $dateFormatee = Carbon::parse($assurance->date_fin)->isoFormat('LL');

        if ($joursRestants < 0) {
            return sprintf(
                "URGENCE - Assurance expirée depuis %d jour(s) pour le véhicule %s %s (%s)",
                abs($joursRestants),
                $vehicule->marque,
                $vehicule->modele,
                $vehicule->immatriculation
            );
        }

        return sprintf(
            "Alerte: L'assurance du %s %s (%s) expire dans %d jour(s) (%s)",
            $vehicule->marque,
            $vehicule->modele,
            $vehicule->immatriculation,
            $joursRestants,
            $dateFormatee
        );
    }

    /**
     * Formate une date au format Y-m-d
     */
    private function formatDate($date): string
    {
        return Carbon::parse($date)->format('Y-m-d');
    }
}
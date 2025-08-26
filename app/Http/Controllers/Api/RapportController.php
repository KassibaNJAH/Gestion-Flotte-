<?php

namespace App\Http\Controllers\Api;
use setasign\Fpdi\Fpdi;
use App\Http\Controllers\Controller;
use App\Models\Entretien;
use App\Models\Vehicule;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;


class RapportController extends Controller
{
    /**
     * Récupère les filtres disponibles
     */
    public function getFiltres()
{
    try {
        return response()->json([
            'types_vehicules' => Vehicule::select('type')->distinct()->pluck('type'),
            'marques' => Vehicule::select('marque')->distinct()->pluck('marque'),
            'immatriculations' => Vehicule::select('immatriculation')->distinct()->pluck('immatriculation'),
            'conducteurs' => Vehicule::with('conducteur')->get()->pluck('conducteur.name')->unique()->filter()
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Erreur interne du serveur'], 500);
    }
}

    /**
     * Génère un rapport JSON des entretiens filtrés
     */
   
   public function genererRapport(Request $request)
{
    $validator = Validator::make($request->all(), [
        'date_debut' => 'nullable|date',
        'date_fin' => 'nullable|date|after_or_equal:date_debut',
        'type_vehicule' => 'nullable|string',
        'marque' => 'nullable|string',
        'immatriculation' => 'nullable|string',
        'conducteur' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Vérifier qu'au moins un filtre est appliqué
    if (empty(array_filter($request->all()))) {
        return response()->json(['message' => 'Au moins un filtre doit être appliqué'], 422);
    }

    $query = Entretien::with('vehicule');

    // Appliquer les filtres
    if ($request->date_debut && $request->date_fin) {
        $query->whereBetween('date_reelle', [$request->date_debut, $request->date_fin]);
    }

    if ($request->type_vehicule) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('type', $request->type_vehicule);
        });
    }

    if ($request->marque) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('marque', 'like', '%'.$request->marque.'%');
        });
    }

    if ($request->immatriculation) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('immatriculation', 'like', '%'.$request->immatriculation.'%');
        });
    }

    if ($request->conducteur) {
        $query->whereHas('vehicule.conducteur', function($q) use ($request) {
            $q->where('nom', 'like', '%'.$request->conducteur.'%');
        });
    }

    // Calculer la somme des dépenses avant de récupérer les résultats
    $total_cout = $query->sum('cout');
    
    // Maintenant récupérer les entretiens avec pagination éventuelle
    $entretiens = $query->get();

    return response()->json([
        'entretiens' => $entretiens,
        'total_cout' => $total_cout,
        'filtres' => $request->all()
    ]);
}

    /**
     * Génère un PDF des entretiens filtrés
     */
    public function genererPDF(Request $request)
{
    // 1. Validation des données
    $validator = Validator::make($request->all(), [
        'date_debut' => 'nullable|date',
        'date_fin' => 'nullable|date|after_or_equal:date_debut',
        'type_vehicule' => 'nullable|string',
        'marque' => 'nullable|string',
        'immatriculation' => 'nullable|string',
        'conducteur' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // 2. Application des filtres
    $query = Entretien::with('vehicule');

    // Filtre par date
    if ($request->date_debut && $request->date_fin) {
        $query->whereBetween('date_reelle', [
            $request->date_debut,
            $request->date_fin
        ]);
    }

    // Filtre par type de véhicule
    if ($request->type_vehicule) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('type', $request->type_vehicule);
        });
    }

    // Filtre par marque
    if ($request->marque) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('marque', 'like', '%'.$request->marque.'%');
        });
    }

    // Filtre par immatriculation
    if ($request->immatriculation) {
        $query->whereHas('vehicule', function($q) use ($request) {
            $q->where('immatriculation', 'like', '%'.$request->immatriculation.'%');
        });
    }

    // Filtre par conducteur
    if ($request->conducteur) {
        $query->whereHas('vehicule.conducteur', function($q) use ($request) {
            $q->where('nom', 'like', '%'.$request->conducteur.'%');
        });
    }

    // 3. Récupération des données
    $entretiens = $query->get();
    $total_cout = $entretiens->sum('cout');

    // 4. Préparation des données pour le PDF
    $data = [
        'entretiens' => $entretiens,
        'total_cout' => $total_cout,
        'filtres' => [
            'date_debut' => $request->date_debut ? date('d/m/Y', strtotime($request->date_debut)) : 'Non spécifié',
            'date_fin' => $request->date_fin ? date('d/m/Y', strtotime($request->date_fin)) : 'Non spécifié',
            'type_vehicule' => $request->type_vehicule ?? 'Tous',
            'marque' => $request->marque ?? 'Toutes',
            'conducteur' => $request->conducteur ?? 'Tous'
        ],
        'date_generation' => now()->format('d/m/Y à H:i')
    ];

    // 5. Génération du PDF
    $pdf = PDF::loadView('pdf.rapport_entretien', $data);

    // 6. Options du PDF
    $pdf->setPaper('A4', 'portrait');
    $pdf->setOptions([
        'isHtml5ParserEnabled' => true,
        'isRemoteEnabled' => true,
        'defaultFont' => 'DejaVu Sans'
    ]);

    // 7. Téléchargement du PDF
    $filename = 'rapport_entretien_'.now()->format('Ymd_His').'.pdf';
    return $pdf->download($filename);
}
}
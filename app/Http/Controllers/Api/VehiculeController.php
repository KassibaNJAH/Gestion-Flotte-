<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class VehiculeController extends Controller
{
    // Types de véhicules autorisés
    private const VEHICLE_TYPES = ['voiture', 'camion', 'camionette', 'autre'];

    public function index()
    {
        $vehicules = Vehicule::all();
        return response()->json($vehicules);
    }

    public function store(Request $request)
    {
        $data = $this->prepareData($request->all());
        
        $validator = Validator::make($data, [
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'immatriculation' => 'required|string|max:255|unique:vehicules',
            'annee' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'date_achat' => 'nullable|date',
            'kilometrage' => 'nullable|integer|min:0',
            'carburant_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'type' => 'required|in:' . implode(',', self::VEHICLE_TYPES),
            'autre_type' => 'required_if:type,autre|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Gestion du type personnalisé
        if ($data['type'] === 'autre') {
            $data['type'] = $data['autre_type'];
        }
        unset($data['autre_type']);

        $vehicule = Vehicule::create($data);

        return response()->json([
            'success' => true,
            'data' => $vehicule
        ], 201);
    }

    public function show($id)
    {
        $vehicule = Vehicule::find($id);
        
        if (!$vehicule) {
            return response()->json([
                'success' => false,
                'message' => 'Véhicule non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $vehicule
        ]);
    }

    public function update(Request $request, $id)
    {
        $vehicule = Vehicule::find($id);
        
        if (!$vehicule) {
            return response()->json([
                'success' => false,
                'message' => 'Véhicule non trouvé'
            ], 404);
        }

        $data = $this->prepareData($request->all());
        
        $validator = Validator::make($data, [
            'marque' => 'sometimes|required|string|max:255',
            'modele' => 'sometimes|required|string|max:255',
            'immatriculation' => 'sometimes|required|string|max:255|unique:vehicules,immatriculation,' . $vehicule->id,
            'annee' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 1),
            'date_achat' => 'nullable|date',
            'kilometrage' => 'nullable|integer|min:0',
            'carburant_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'type' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $vehicule->update($data);

        return response()->json([
            'success' => true,
            'data' => $vehicule
        ]);
    }

    public function destroy($id)
    {
        $vehicule = Vehicule::find($id);
        
        if (!$vehicule) {
            return response()->json([
                'success' => false,
                'message' => 'Véhicule non trouvé'
            ], 404);
        }

        $vehicule->delete();

        return response()->json([
            'success' => true,
            'message' => 'Véhicule supprimé avec succès'
        ]);
    }

    /**
     * Prépare les données avant validation
     */
    private function prepareData(array $data): array
    {
        // Formatage de la date d'achat
        if (!empty($data['date_achat'])) {
            try {
                $data['date_achat'] = Carbon::parse($data['date_achat'])->format('Y-m-d');
            } catch (\Exception $e) {
                // Garde la valeur originale si le parsing échoue
            }
        }

        return $data;
    }
    
}
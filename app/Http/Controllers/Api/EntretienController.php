<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Entretien;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EntretienController extends Controller
{
    public function index()
    {
        $entretiens = Entretien::with('vehicule')->get();
        return response()->json($entretiens);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'required|exists:vehicules,id',
            'type_entretien' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_prevue' => 'required|date',
            'date_reelle' => 'nullable|date',
            'cout' => 'nullable|numeric|min:0',
            'kilometrage' => 'nullable|integer|min:0',
            'statut' => 'required|in:planifié,effectué,annulé,reporté',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $entretien = Entretien::create($request->all());

        return response()->json($entretien, 201);
    }

    public function show($id)
    {
        $entretien = Entretien::with('vehicule')->find($id);
        if (!$entretien) {
            return response()->json(['message' => 'Entretien non trouvé'], 404);
        }
        return response()->json($entretien);
    }

    public function update(Request $request, $id)
    {
        $entretien = Entretien::find($id);
        if (!$entretien) {
            return response()->json(['message' => 'Entretien non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'sometimes|required|exists:vehicules,id',
            'type_entretien' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'date_prevue' => 'sometimes|required|date',
            'date_reelle' => 'nullable|date',
            'cout' => 'nullable|numeric|min:0',
            'kilometrage' => 'nullable|integer|min:0',
            'statut' => 'sometimes|required|in:planifié,effectué,annulé,reporté',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $entretien->update($request->all());

        return response()->json($entretien);
    }

    public function destroy($id)
    {
        $entretien = Entretien::find($id);
        if (!$entretien) {
            return response()->json(['message' => 'Entretien non trouvé'], 404);
        }

        $entretien->delete();

        return response()->json(['message' => 'Entretien supprimé avec succès']);
    }

    public function byVehicule($vehiculeId)
    {
        $entretiens = Entretien::where('vehicule_id', $vehiculeId)
            ->with('vehicule')
            ->orderBy('date_prevue', 'desc')
            ->get();
            
        return response()->json($entretiens);
    }


}
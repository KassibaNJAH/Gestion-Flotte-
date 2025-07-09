<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assurance;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssuranceController extends Controller
{
    public function index()
    {
        $assurances = Assurance::with('vehicule')->get();
        return response()->json($assurances);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'required|exists:vehicules,id',
            'numero_contrat' => 'required|string|max:255',
            'assureur' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'prix' => 'required|numeric|min:0',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $assurance = Assurance::create($request->all());

        return response()->json($assurance, 201);
    }

    public function show($id)
    {
        $assurance = Assurance::with('vehicule')->find($id);
        if (!$assurance) {
            return response()->json(['message' => 'Assurance non trouvée'], 404);
        }
        return response()->json($assurance);
    }

    public function update(Request $request, $id)
    {
        $assurance = Assurance::find($id);
        if (!$assurance) {
            return response()->json(['message' => 'Assurance non trouvée'], 404);
        }

        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'sometimes|required|exists:vehicules,id',
            'numero_contrat' => 'sometimes|required|string|max:255',
            'assureur' => 'sometimes|required|string|max:255',
            'date_debut' => 'sometimes|required|date',
            'date_fin' => 'sometimes|required|date|after:date_debut',
            'prix' => 'sometimes|required|numeric|min:0',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $assurance->update($request->all());

        return response()->json($assurance);
    }

    public function destroy($id)
    {
        $assurance = Assurance::find($id);
        if (!$assurance) {
            return response()->json(['message' => 'Assurance non trouvée'], 404);
        }

        $assurance->delete();

        return response()->json(['message' => 'Assurance supprimée avec succès']);
    }

    public function byVehicule($vehiculeId)
    {
        $assurances = Assurance::where('vehicule_id', $vehiculeId)
            ->with('vehicule')
            ->orderBy('date_fin', 'asc')
            ->get();
            
        return response()->json($assurances);
    }
}
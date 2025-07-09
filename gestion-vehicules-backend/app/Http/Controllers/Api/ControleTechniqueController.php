<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ControleTechnique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ControleTechniqueController extends Controller
{
    public function index()
    {
        return response()->json(ControleTechnique::with('vehicule')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'required|exists:vehicules,id',
            'date_controle' => 'required|date|date_format:Y-m-d|before_or_equal:today',
            'date_prochaine_controle' => 'required|date|date_format:Y-m-d|after:date_controle',
            'resultat' => 'required|in:favorable,défavorable',
            'centre_controle' => 'required|string|max:255',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $controle = ControleTechnique::create($request->all());

        return response()->json($controle, 201);
    }

    public function show($id)
    {
        $controle = ControleTechnique::with('vehicule')->find($id);
        return $controle ? response()->json($controle) : response()->json(['message' => 'Controle technique non trouvé'], 404);
    }

    public function update(Request $request, $id)
    {
        $controle = ControleTechnique::find($id);
        if (!$controle) {
            return response()->json(['message' => 'Controle technique non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'sometimes|required|exists:vehicules,id',
            'date_controle' => 'sometimes|required|date|date_format:Y-m-d|before_or_equal:today',
            'date_prochaine_controle' => 'sometimes|required|date|date_format:Y-m-d|after:date_controle',
            'resultat' => 'sometimes|required|in:favorable,défavorable',
            'centre_controle' => 'sometimes|required|string|max:255',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $controle->update($request->all());

        return response()->json($controle);
    }

    public function destroy($id)
    {
        $controle = ControleTechnique::find($id);
        if (!$controle) {
            return response()->json(['message' => 'Controle technique non trouvé'], 404);
        }

        $controle->delete();

        return response()->json(['message' => 'Controle technique supprimé avec succès']);
    }

    public function byVehicule($vehiculeId)
    {
        return response()->json(
            ControleTechnique::where('vehicule_id', $vehiculeId)
                ->with('vehicule')
                ->orderBy('date_controle', 'desc')
                ->get()
        );
    }
}
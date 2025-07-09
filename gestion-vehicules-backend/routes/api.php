<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\EntretienController;
use App\Http\Controllers\Api\AssuranceController;
use App\Http\Controllers\Api\ControleTechniqueController;
use App\Http\Controllers\Api\AlerteController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('vehicules', VehiculeController::class);
Route::apiResource('entretiens', EntretienController::class);
Route::get('vehicules/{vehiculeId}/entretiens', [EntretienController::class, 'byVehicule']);
Route::apiResource('assurances', AssuranceController::class);
Route::get('vehicules/{vehiculeId}/assurances', [AssuranceController::class, 'byVehicule']);
Route::apiResource('controle-techniques', ControleTechniqueController::class);
Route::get('vehicules/{vehiculeId}/controle-techniques', [ControleTechniqueController::class, 'byVehicule']);
Route::get('/alertes/assurances', [AlerteController::class, 'getAlertesAssurances']);
Route::patch('/alertes/assurances/{id}/marquer-traitee', [AlerteController::class, 'marquerCommeTraitee']);
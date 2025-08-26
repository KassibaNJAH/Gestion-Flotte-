<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\EntretienController;
use App\Http\Controllers\Api\AssuranceController;
use App\Http\Controllers\Api\ControleTechniqueController;
use App\Http\Controllers\Api\AlerteController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\DrivingHistoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssignementController;
use App\Http\Controllers\Api\RapportController;

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
Route::post('/login', [AuthController::class, 'login']);
Route::post('/driver-login', [AuthController::class, 'login']);
Route::post('/driver-logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::apiResource('drivers', DriverController::class);
Route::apiResource('histories', DrivingHistoryController::class);
Route::apiResource('assignments', AssignementController::class);
Route::prefix('rapports')->group(function () {
    Route::post('/entretiens', [RapportController::class, 'genererRapport']);
    Route::post('/entretiens/pdf', [RapportController::class, 'genererPDF']);
    Route::get('/filtres', [RapportController::class, 'getFiltres']);
});
// Profil et mot de passe du conducteur connecté (protégé)
Route::middleware(['auth:sanctum', 'driver'])->group(function () {
    Route::get('/driver/profile', [DriverController::class, 'showProfile']);
    Route::post('/driver/update-password', [DriverController::class, 'updatePassword']);
});
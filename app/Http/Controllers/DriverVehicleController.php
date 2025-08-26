<?php

namespace App\Http\Controllers;
use App\Models\Driver;
use Illuminate\Http\Request;

class DrivervehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function assignvehicule(Request $request, Driver $driver)
{
    $validated = $request->validate([
        'vehicule_id' => 'required|exists:vehicules,id',
        'assignment_date' => 'required|date'
    ]);

    $driver->vehicules()->attach($validated['vehicule_id'], [
        'assignment_date' => $validated['assignment_date']
    ]);

    return response()->json(['message' => 'Véhicule attribué avec succès']);
}

public function getDrivervehicules(Driver $driver)
{
    return response()->json($driver->vehicules);
}
}

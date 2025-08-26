<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DrivingHistory extends Model
{
    use HasFactory;

            // DrivingHistory.php
        protected $fillable = [
            'type',
            'description',
            'date',
            'driver_id',
            'vehicule_id' 
];


    // Relation avec le conducteur
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
public function vehicule()
{
    return $this->belongsTo(Vehicule::class);
}

}
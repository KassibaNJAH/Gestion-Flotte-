<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    use HasFactory;

    protected $fillable = [
        'marque',
        'modele',
        'immatriculation',
        'annee',
        'date_achat',
        'kilometrage',
        'carburant_type',
        'notes',
        'type'
    ];

    protected $casts = [
        'date_achat' => 'date:Y-m-d',
        'annee' => 'integer',
        'kilometrage' => 'integer',
        'type' => 'string'
    ];
    public static $types = [
    'voiture' => 'Voiture',
    'camion' => 'Camion',
    'camionette' => 'Camionette',
    'Autre' => 'Autre'
];
    public function assurances()
{
    return $this->hasMany(Assurance::class);
}
public function entretiens()
    {
        return $this->hasMany(Entretien::class);
    }
    public function conducteur()
    {
        return $this->belongsTo(Driver::class);
    }
}
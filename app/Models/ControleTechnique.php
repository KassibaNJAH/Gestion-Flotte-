<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ControleTechnique extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicule_id',
        'date_controle',
        'date_prochaine_controle', 
        'resultat',
        'centre_controle',
        'notes'
    ];

    protected $casts = [
        'date_controle' => 'date',
        'date_prochain_controle' => 'date',
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }
}
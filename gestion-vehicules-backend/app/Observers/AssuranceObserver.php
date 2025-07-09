<?php

namespace App\Observers;

use App\Models\Assurance;

class AssuranceObserver
{
    public function created(Assurance $assurance)
    {
        $assurance->creerAlerte();
    }

    public function updated(Assurance $assurance)
    {
        if ($assurance->isDirty('date_fin')) {
            // Supprimer les anciennes alertes
            $assurance->alertes()->delete();
            // Créer une nouvelle alerte avec la nouvelle date
            $assurance->creerAlerte();
        }
    }

    public function deleted(Assurance $assurance)
    {
        $assurance->alertes()->delete();
    }
}
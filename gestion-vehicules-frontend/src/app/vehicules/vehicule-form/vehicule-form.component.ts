import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from '../services/vehicule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicule } from '../models/vehicule.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.component.html',
  styleUrls: ['./vehicule-form.component.css']
})
export class VehiculeFormComponent implements OnInit {
  vehiculeForm: FormGroup;
  isEditMode = false;
  vehiculeId: number | null = null;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.vehiculeForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      immatriculation: ['', Validators.required],
      annee: ['', [
        Validators.required, 
        Validators.min(1900), 
        Validators.max(this.currentYear + 1)
      ]],
      date_achat: [''],
      kilometrage: ['', Validators.min(0)],
      carburant_type: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.vehiculeId = +id;
        this.loadVehiculeData(this.vehiculeId);
      }
    });
  }

  loadVehiculeData(id: number): void {
    this.vehiculeService.getVehicule(id).subscribe(
      (vehicule) => {
        this.vehiculeForm.patchValue({
          marque: vehicule.marque,
          modele: vehicule.modele,
          immatriculation: vehicule.immatriculation,
          annee: vehicule.annee,
          date_achat: vehicule.date_achat,
          kilometrage: vehicule.kilometrage,
          carburant_type: vehicule.carburant_type,
          notes: vehicule.notes
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du véhicule:', error);
        this.snackBar.open('Erreur lors du chargement du véhicule', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

 onSubmit(): void {
  if (this.vehiculeForm.valid) {
    const vehiculeData = this.vehiculeForm.value;
    if (vehiculeData.date_achat) {
            vehiculeData.date_achat = new Date(vehiculeData.date_achat).toISOString().split('T')[0];
        }
    if (this.isEditMode && this.vehiculeId) {
      this.vehiculeService.updateVehicule(this.vehiculeId, vehiculeData).subscribe(
        () => {
          this.snackBar.open('Véhicule mis à jour avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/vehicules']);
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {

      this.vehiculeService.createVehicule(vehiculeData).subscribe(
        () => {
          this.snackBar.open('Véhicule créé avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/vehicules']);
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }
}

private handleError(error: any): void {
  console.error('Erreur:', error);
  
  if (error.status === 422 && error.error.errors) {
    // Afficher les erreurs de validation
    let errorMessages = '';
    for (const field in error.error.errors) {
      errorMessages += `${field}: ${error.error.errors[field].join(', ')}\n`;
    }
    this.snackBar.open(`Erreurs de validation:\n${errorMessages}`, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  } else {
    this.snackBar.open('Une erreur est survenue', 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
}
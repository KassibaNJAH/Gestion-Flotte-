import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssuranceService } from '../services/assurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assurance } from '../models/assurance.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiculeService } from '../../vehicules/services/vehicule.service';
import { Vehicule } from '../../vehicules/models/vehicule.model';

@Component({
  selector: 'app-assurance-form',
  templateUrl: './assurance-form.component.html',
  styleUrls: ['./assurance-form.component.css']
})
export class AssuranceFormComponent implements OnInit {
  assuranceForm: FormGroup;
  isEditMode = false;
  assuranceId: number | null = null;
  vehicules: Vehicule[] = [];

  constructor(
    private fb: FormBuilder,
    private assuranceService: AssuranceService,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.assuranceForm = this.fb.group({
      vehicule_id: ['', Validators.required],
      numero_contrat: ['', Validators.required],
      assureur: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadVehicules();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.assuranceId = +id;
        this.loadAssuranceData(this.assuranceId);
      }
    });
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (vehicules) => {
        this.vehicules = vehicules;
      },
      (error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    );
  }

  loadAssuranceData(id: number): void {
    this.assuranceService.getAssurance(id).subscribe(
      (assurance) => {
        this.assuranceForm.patchValue({
          vehicule_id: assurance.vehicule_id,
          numero_contrat: assurance.numero_contrat,
          assureur: assurance.assureur,
          date_debut: assurance.date_debut,
          date_fin: assurance.date_fin,
          prix: assurance.prix,
          notes: assurance.notes
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'assurance:', error);
        this.snackBar.open('Erreur lors du chargement de l\'assurance', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  onSubmit(): void {
    if (this.assuranceForm.valid) {
      const assuranceData = this.assuranceForm.value;

      if (this.isEditMode && this.assuranceId) {
        this.assuranceService.updateAssurance(this.assuranceId, assuranceData).subscribe(
          () => {
            this.snackBar.open('Assurance mise à jour avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/assurances']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.snackBar.open('Erreur lors de la mise à jour de l\'assurance', 'Fermer', {
              duration: 3000
            });
          }
        );
      } else {
        this.assuranceService.createAssurance(assuranceData).subscribe(
          () => {
            this.snackBar.open('Assurance créée avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/assurances']);
          },
          (error) => {
            console.error('Erreur lors de la création:', error);
            this.snackBar.open('Erreur lors de la création de l\'assurance', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    }
  }
}
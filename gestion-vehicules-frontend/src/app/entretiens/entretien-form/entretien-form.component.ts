import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntretienService } from '../services/entretien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Entretien } from '../models/entretien.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiculeService } from '../../vehicules/services/vehicule.service';
import { Vehicule } from '../../vehicules/models/vehicule.model';

@Component({
  selector: 'app-entretien-form',
  templateUrl: './entretien-form.component.html',
  styleUrls: ['./entretien-form.component.css']
})
export class EntretienFormComponent implements OnInit {
  entretienForm: FormGroup;
  isEditMode = false;
  entretienId: number | null = null;
  typesEntretien: string[] = [];
  statuts: { [key: string]: string } = {};
  vehicules: Vehicule[] = [];

  constructor(
    private fb: FormBuilder,
    private entretienService: EntretienService,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.entretienForm = this.fb.group({
      vehicule_id: ['', Validators.required],
      type_entretien: ['', Validators.required],
      description: [''],
      date_prevue: ['', Validators.required],
      date_reelle: [''],
      cout: ['', [Validators.min(0)]],
      kilometrage: ['', [Validators.min(0)]],
      statut: ['planifié', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.typesEntretien = this.entretienService.getTypesEntretien();
    this.statuts = this.entretienService.getStatuts();
    this.loadVehicules();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.entretienId = +id;
        this.loadEntretienData(this.entretienId);
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

  loadEntretienData(id: number): void {
    this.entretienService.getEntretien(id).subscribe(
      (entretien) => {
        this.entretienForm.patchValue({
          vehicule_id: entretien.vehicule_id,
          type_entretien: entretien.type_entretien,
          description: entretien.description,
          date_prevue: entretien.date_prevue,
          date_reelle: entretien.date_reelle,
          cout: entretien.cout,
          kilometrage: entretien.kilometrage,
          statut: entretien.statut,
          notes: entretien.notes
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'entretien:', error);
        this.snackBar.open('Erreur lors du chargement de l\'entretien', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  onSubmit(): void {
    if (this.entretienForm.valid) {
      const entretienData = this.entretienForm.value;

      if (this.isEditMode && this.entretienId) {
        this.entretienService.updateEntretien(this.entretienId, entretienData).subscribe(
          () => {
            this.snackBar.open('Entretien mis à jour avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/entretiens']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.snackBar.open('Erreur lors de la mise à jour de l\'entretien', 'Fermer', {
              duration: 3000
            });
          }
        );
      } else {
        this.entretienService.createEntretien(entretienData).subscribe(
          () => {
            this.snackBar.open('Entretien créé avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/entretiens']);
          },
          (error) => {
            console.error('Erreur lors de la création:', error);
            this.snackBar.open('Erreur lors de la création de l\'entretien', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    }
  }

  onStatutChange(): void {
    const statut = this.entretienForm.get('statut')?.value;
    if (statut === 'effectué') {
      this.entretienForm.get('date_reelle')?.setValue(new Date().toISOString().split('T')[0]);
    }
  }
}
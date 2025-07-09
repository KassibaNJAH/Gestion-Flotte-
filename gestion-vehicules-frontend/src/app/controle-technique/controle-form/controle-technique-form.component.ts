import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ControleTechnique } from '../models/controle-technique.model';
import { ControleTechniqueService } from '../services/controle-technique.service';
import { VehiculeService } from '../../vehicules/services/vehicule.service';
import { Vehicule } from '../../vehicules/models/vehicule.model';

@Component({
  selector: 'app-controle-technique-form',
  templateUrl: './controle-technique-form.component.html',
  styleUrls: ['./controle-technique-form.component.css'],
  providers: [DatePipe]
})
export class ControleTechniqueFormComponent implements OnInit {
  controleForm: FormGroup;
  isEditMode = false;
  controleId: number | null = null;
  vehicules: Vehicule[] = [];
  resultats = ['favorable', 'défavorable'];

  constructor(
    private fb: FormBuilder,
    private controleService: ControleTechniqueService,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.controleForm = this.fb.group({
      vehicule_id: ['', Validators.required],
      date_controle: ['', Validators.required],
      date_prochaine_controle: ['', Validators.required],
      resultat: ['', Validators.required],
      centre_controle: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadVehicules();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.controleId = +id;
        this.loadControleData(this.controleId);
      }
    });
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      vehicules => this.vehicules = vehicules,
      error => console.error('Erreur chargement véhicules', error)
    );
  }

  loadControleData(id: number): void {
    this.controleService.getControle(id).subscribe(
      controle => {
        this.controleForm.patchValue({
          vehicule_id: controle.vehicule_id,
          date_controle: controle.date_controle,
          date_prochaine_controle: controle.date_prochaine_controle,
          resultat: controle.resultat,
          centre_controle: controle.centre_controle,
          notes: controle.notes
        });
      },
      error => this.handleError(error)
    );
  }

  onSubmit(): void {
    if (this.controleForm.valid) {
      const formValue = this.controleForm.value;
      const controleData: ControleTechnique = {
        vehicule_id: formValue.vehicule_id,
        date_controle: this.datePipe.transform(formValue.date_controle, 'yyyy-MM-dd')!,
        date_prochaine_controle: this.datePipe.transform(formValue.date_prochaine_controle, 'yyyy-MM-dd')!,
        resultat: formValue.resultat,
        centre_controle: formValue.centre_controle,
        notes: formValue.notes
      };

      const operation$ = this.isEditMode && this.controleId
        ? this.controleService.updateControle(this.controleId, controleData)
        : this.controleService.createControle(controleData);

      operation$.subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess(): void {
    this.snackBar.open(
      `Contrôle technique ${this.isEditMode ? 'mis à jour' : 'créé'} avec succès`, 
      'Fermer', 
      { duration: 3000 }
    );
    this.router.navigate(['/controles-techniques']);
  }

  private handleError(error: HttpErrorResponse): void {
    console.error('Erreur:', error);
    let errorMessage = 'Une erreur est survenue';

    if (error.status === 422 && error.error) {
      errorMessage = 'Erreurs de validation: ' + Object.values(error.error).join(', ');
    }

    this.snackBar.open(errorMessage, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
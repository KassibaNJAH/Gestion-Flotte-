import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntretienListComponent } from './entretien-list/entretien-list.component';
import { EntretienFormComponent } from './entretien-form/entretien-form.component';
import { EntretienHistoricComponent } from './entretien-historic/entretien-historic.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { VehiculesModule } from '../vehicules/vehicules.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { EntretiensRoutingModule } from './entretiens-routing.module';

@NgModule({
  declarations: [
    EntretienListComponent,
    EntretienFormComponent,
    EntretienHistoricComponent,
    ConfirmDialogComponent
  ],
  imports: [
    EntretiensRoutingModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    VehiculesModule
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class EntretiensModule { }
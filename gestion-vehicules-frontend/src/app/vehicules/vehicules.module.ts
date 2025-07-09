import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { VehiculeFormComponent } from './vehicule-form/vehicule-form.component';
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
import { VehiculesRoutingModule } from './vehicules-routing.module';
@NgModule({
  declarations: [
    VehiculeListComponent,
    VehiculeFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VehiculesRoutingModule,
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
    HttpClientModule
  ]
})
export class VehiculesModule { }
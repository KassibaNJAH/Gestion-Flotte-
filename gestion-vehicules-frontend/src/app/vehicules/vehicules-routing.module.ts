import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { VehiculeFormComponent } from './vehicule-form/vehicule-form.component';

const routes: Routes = [
  { 
    path: '', 
    component: VehiculeListComponent,
    data: { title: 'Liste des véhicules' } 
  },
  { 
    path: 'new', 
    component: VehiculeFormComponent,
    data: { title: 'Nouveau véhicule' } 
  },
  { 
    path: 'edit/:id', 
    component: VehiculeFormComponent,
    data: { title: 'Modifier véhicule' } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculesRoutingModule { }
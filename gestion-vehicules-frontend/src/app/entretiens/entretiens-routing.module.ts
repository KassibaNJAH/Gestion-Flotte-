import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntretienListComponent } from './entretien-list/entretien-list.component';
import { EntretienFormComponent } from './entretien-form/entretien-form.component';
import { EntretienHistoricComponent } from './entretien-historic/entretien-historic.component';

const routes: Routes = [
  { path: '', component: EntretienListComponent }, // Route pour /entretiens
  { path: 'new', component: EntretienFormComponent }, // Route pour /entretiens/new
  { path: 'edit/:id', component: EntretienFormComponent }, // Route pour /entretiens/edit/1
  { path: 'historic/:id', component: EntretienHistoricComponent } // Route pour /entretiens/historic/1
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntretiensRoutingModule { }
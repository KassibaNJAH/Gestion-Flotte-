import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceListComponent } from './assurance-list/assurance-list.component';
import { AssuranceFormComponent } from './assurance-form/assurance-form.component';

const routes: Routes = [
  { path: '', component: AssuranceListComponent },
  { path: 'new', component: AssuranceFormComponent },
  { path: 'edit/:id', component: AssuranceFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssurancesRoutingModule { }
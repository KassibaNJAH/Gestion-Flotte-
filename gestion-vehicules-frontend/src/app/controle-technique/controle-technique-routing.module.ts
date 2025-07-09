import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleListComponent } from './controle-list/controle-list.component';
import { ControleTechniqueFormComponent } from './controle-form/controle-technique-form.component';

const routes: Routes = [
  { path: '', component: ControleListComponent },
  { path: 'new', component: ControleTechniqueFormComponent},
  { path: 'edit/:id', component: ControleTechniqueFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleTechniqueRoutingModule { }
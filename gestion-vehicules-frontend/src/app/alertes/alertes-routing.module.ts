import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertesComponent } from './alertes.component';

const routes: Routes = [{ path: '', component: AlertesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertesRoutingModule { }

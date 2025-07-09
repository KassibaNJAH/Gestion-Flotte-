import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'vehicules', 
    loadChildren: () => import('./vehicules/vehicules.module').then(m => m.VehiculesModule) 
  },
  { 
    path: 'entretiens', 
    loadChildren: () => import('./entretiens/entretiens.module').then(m => m.EntretiensModule) 
  },
  { 
    path: 'assurances', 
    loadChildren: () => import('./assurances/assurances.module').then(m => m.AssurancesModule) 
  },
  { 
    path: 'controle-technique', 
    loadChildren: () => import('./controle-technique/controle-technique.module').then(m => m.ControleTechniqueModule) 
  },
  { path: '', redirectTo: 'vehicules', pathMatch: 'full' },
  { path: 'alertes', loadChildren: () => import('./alertes/alertes.module').then(m => m.AlertesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
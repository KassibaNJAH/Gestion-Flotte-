import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { ControleListComponent } from './controle-list/controle-list.component';
import { ControleTechniqueFormComponent } from './controle-form/controle-technique-form.component';
import { ControleTechniqueRoutingModule } from './controle-technique-routing.module';

@NgModule({
  declarations: [
    ControleListComponent,
    ControleTechniqueFormComponent
  ],
  imports: [
    // Angular Modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Angular Material Modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    
    // Feature Routing
    ControleTechniqueRoutingModule
  ],

})
export class ControleTechniqueModule { }
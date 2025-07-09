import { NgModule } from '@angular/core';
import { AlertesMenuComponent } from 'src/app/navigation/alertes-menu/alertes-menu/alertes-menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/alertes/services/alerte.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
   AlertesMenuComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule ,
    MatSnackBarModule,
    MatDialogModule,    
    BrowserAnimationsModule,   
    MatProgressSpinnerModule, 
    MatButtonModule,  
    MatTooltipModule,  
    MatDividerModule   
  ],
  exports: [
  AlertesMenuComponent,
  ]
})
export class AlertesModule { }
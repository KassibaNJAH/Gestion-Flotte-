import { Component } from '@angular/core';
import { AlerteService } from 'src/app/alertes/services/alerte.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
@Component({
  selector: 'app-alertes-menu',
  templateUrl: './alertes-menu.component.html',
  styleUrls: ['./alertes-menu.component.css']
})
export class AlertesMenuComponent {
  constructor(
    public alerteService: AlerteService,
    private snackBar: MatSnackBar,
    private router: Router
    
  ) {}

  getUrgenceClass(urgence: string): string {
    return urgence.toLowerCase();
  }

  getUrgenceColor(urgence: string): string {
    const colors: Record<string, string> = {
      'expiree': 'warn',
      'critique': 'warn',
      'elevee': 'accent',
      'moyenne': 'primary',
      'basse': 'primary'
    };
    return colors[urgence] || 'primary';
  }

  getUrgenceIcon(urgence: string): string {
    const icons: Record<string, string> = {
      'expiree': 'error',
      'critique': 'warning',
      'elevee': 'warning',
      'moyenne': 'info',
      'basse': 'info'
    };
    return icons[urgence] || 'notifications';
  }

  marquerCommeLue(id: number, event: Event): void {
    event.stopPropagation();
    this.alerteService.marquerCommeTraitee(id).subscribe({
      next: () => {
        this.alerteService.loadAlertes();
        this.snackBar.open('Alerte traitée', 'Fermer', { duration: 3000 });
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  voirVehicule(id: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/vehicules']);
  }
}
import { Component, OnInit } from '@angular/core';
import { ControleTechniqueService } from '../services/controle-technique.service';
import { ControleTechnique } from '../models/controle-technique.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-controle-list',
  templateUrl: './controle-list.component.html',
  styleUrls: ['./controle-list.component.css']
})
export class ControleListComponent implements OnInit {
  displayedColumns: string[] = ['dates', 'vehicule', 'jours_restants', 'actions'];
  dataSource = new MatTableDataSource<ControleTechnique>();
  loading = true;

  constructor(
    private controleService: ControleTechniqueService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadControles();
  }

  loadControles(): void {
    this.loading = true;
    this.controleService.getControles().subscribe(
      (controles) => {
        this.dataSource.data = controles;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des contrôles:', error);
        this.loading = false;
      }
    );
  }

  editControle(id: number): void {
    this.router.navigate(['/controle-technique/edit', id]);
  }

  deleteControle(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce contrôle technique?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.controleService.deleteControle(id).subscribe(
          () => {
            this.snackBar.open('Contrôle technique supprimé avec succès', 'Fermer', {
              duration: 3000
            });
            this.loadControles();
          },
          (error) => {
            console.error('Erreur lors de la suppression:', error);
            this.snackBar.open('Erreur lors de la suppression du contrôle technique', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    });
  }

  addControle(): void {
    this.router.navigate(['/controle-technique/new']);
  }

  getJoursRestants(dateProchaineControle: string): number {
  if (!dateProchaineControle) return 0;
  
  try {
    const dateProchain = new Date(dateProchaineControle);
    const aujourdHui = new Date();
    
    // Normalisation des dates (ignore les heures)
    aujourdHui.setHours(0, 0, 0, 0);
    dateProchain.setHours(0, 0, 0, 0);
    
    const diffMs = dateProchain.getTime() - aujourdHui.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  } catch (e) {
    console.error('Erreur de date', e);
    return 0;
  }
}
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
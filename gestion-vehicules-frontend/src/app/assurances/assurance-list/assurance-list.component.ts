import { Component, OnInit } from '@angular/core';
import { AssuranceService } from '../services/assurance.service';
import { Assurance } from '../models/assurance.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assurance-list',
  templateUrl: './assurance-list.component.html',
  styleUrls: ['./assurance-list.component.css']
})
export class AssuranceListComponent implements OnInit {
  displayedColumns: string[] = ['numero_contrat', 'assureur', 'dates', 'prix', 'vehicule', 'actions'];
  dataSource = new MatTableDataSource<Assurance>();
  loading = true;

  constructor(
    private assuranceService: AssuranceService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAssurances();
  }

  loadAssurances(): void {
    this.loading = true;
    this.assuranceService.getAssurances().subscribe(
      (assurances) => {
        this.dataSource.data = assurances;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des assurances:', error);
        this.loading = false;
      }
    );
  }

  editAssurance(id: number): void {
    this.router.navigate(['/assurances/edit', id]);
  }

  deleteAssurance(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette assurance?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assuranceService.deleteAssurance(id).subscribe(
          () => {
            this.snackBar.open('Assurance supprimée avec succès', 'Fermer', {
              duration: 3000
            });
            this.loadAssurances();
          },
          (error) => {
            console.error('Erreur lors de la suppression:', error);
            this.snackBar.open('Erreur lors de la suppression de l\'assurance', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    });
  }

  addAssurance(): void {
    this.router.navigate(['/assurances/new']);
  }

  getJoursRestants(dateFin: string): number {
    const fin = new Date(dateFin);
    const aujourdhui = new Date();
    const diffTime = fin.getTime() - aujourdhui.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
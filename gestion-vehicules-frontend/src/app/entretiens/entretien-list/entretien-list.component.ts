import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../services/entretien.service';
import { Entretien } from '../models/entretien.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-entretien-list',
  templateUrl: './entretien-list.component.html',
  styleUrls: ['./entretien-list.component.css']
})
export class EntretienListComponent implements OnInit {
  displayedColumns: string[] = ['vehicule', 'type', 'date_prevue', 'statut', 'actions'];
  dataSource = new MatTableDataSource<Entretien>();
  loading = true;

  constructor(
    private entretienService: EntretienService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEntretiens();
  }

  loadEntretiens(): void {
    this.loading = true;
    this.entretienService.getEntretiens().subscribe(
      (entretiens) => {
        this.dataSource.data = entretiens;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des entretiens:', error);
        this.loading = false;
      }
    );
  }

  editEntretien(id: number): void {
    this.router.navigate(['/entretiens/edit', id]);
  }

  deleteEntretien(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet entretien?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entretienService.deleteEntretien(id).subscribe(
          () => {
            this.loadEntretiens();
          },
          (error) => {
            console.error('Erreur lors de la suppression:', error);
          }
        );
      }
    });
  }

  addEntretien(): void {
    this.router.navigate(['/entretiens/new']);
  }

  viewHistoric(vehiculeId: number): void {
    this.router.navigate(['/entretiens/historic', vehiculeId]);
  }

  getStatutLabel(statut: string): string {
    const statuts = this.entretienService.getStatuts();
    return statuts[statut] || statut;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
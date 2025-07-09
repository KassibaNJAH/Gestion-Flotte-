import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../models/vehicule.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.css']
})
export class VehiculeListComponent implements OnInit {
  displayedColumns: string[] = ['immatriculation', 'marque', 'modele', 'annee', 'actions'];
  dataSource = new MatTableDataSource<Vehicule>();

  constructor(
    private vehiculeService: VehiculeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (vehicules) => {
        this.dataSource.data = vehicules;
      },
      (error) => {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    );
  }

  editVehicule(id: number): void {
    this.router.navigate(['/vehicules/edit', id]);
  }

  deleteVehicule(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.vehiculeService.deleteVehicule(id).subscribe(
        () => {
          this.loadVehicules();
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  addVehicule(): void {
    this.router.navigate(['/vehicules/new']);
  }
}
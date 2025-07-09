import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Ajoutez Router ici
import { EntretienService } from '../services/entretien.service';
import { Entretien } from '../models/entretien.model';
import { VehiculeService } from '../../vehicules/services/vehicule.service';
import { Vehicule } from '../../vehicules/models/vehicule.model';

@Component({
  selector: 'app-entretien-historic',
  templateUrl: './entretien-historic.component.html',
  styleUrls: ['./entretien-historic.component.css']
})
export class EntretienHistoricComponent implements OnInit {
  vehiculeId: number | null = null;
  vehicule: Vehicule | null = null;
  entretiens: Entretien[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router, // Injectez le Router ici
    private entretienService: EntretienService,
    private vehiculeService: VehiculeService
  ) { }

  ngOnInit(): void {
    this.vehiculeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    // Charger les informations du véhicule
    this.vehiculeService.getVehicule(this.vehiculeId!).subscribe(
      (vehicule) => {
        this.vehicule = vehicule;
      },
      (error) => {
        console.error('Erreur lors du chargement du véhicule:', error);
      }
    );

    // Charger l'historique des entretiens
    this.entretienService.getEntretiensByVehicule(this.vehiculeId!).subscribe(
      (entretiens) => {
        this.entretiens = entretiens;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des entretiens:', error);
        this.loading = false;
      }
    );
  }

  getStatutLabel(statut: string): string {
    const statuts = this.entretienService.getStatuts();
    return statuts[statut] || statut;
  }
}
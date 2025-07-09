import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:8000/api/vehicules';

  // Liste des types avec libellés affichables
  private vehiculeTypes = [
    { value: 'voiture', label: 'Voiture' },
    { value: 'camion', label: 'Camion' },
    { value: 'camionette', label: 'Camionette' },
    { value: 'autre', label: 'Autre (à préciser)' }
  ];

  constructor(private http: HttpClient) { }

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  // Retourne les types formatés pour l'interface
  getTypesVehicule(): { value: string, label: string }[] {
    return this.vehiculeTypes;
  }

  // Retourne seulement les valeurs pour la validation
  getTypeValues(): string[] {
    return this.vehiculeTypes.map(type => type.value);
  }

  getVehicule(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }

  createVehicule(vehicule: Vehicule): Observable<Vehicule> {
    // Normalisation du type avant envoi
    const payload = {
      ...vehicule,
      type: this.normalizeType(vehicule.type, vehicule.customType)
    };
    return this.http.post<Vehicule>(this.apiUrl, payload);
  }

  updateVehicule(id: number, vehicule: Vehicule): Observable<Vehicule> {
    // Normalisation du type avant envoi
    const payload = {
      ...vehicule,
      type: this.normalizeType(vehicule.type, vehicule.customType)
    };
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, payload);
  }

  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode privée pour gérer la logique de type
  private normalizeType(type: string, customType?: string): string {
    return type === 'autre' && customType ? customType : type;
  }
}
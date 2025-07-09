import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entretien } from '../models/entretien.model';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  private apiUrl = 'http://localhost:8000/api/entretiens';

  constructor(private http: HttpClient) { }

  getEntretiens(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(this.apiUrl);
  }

  getEntretien(id: number): Observable<Entretien> {
    return this.http.get<Entretien>(`${this.apiUrl}/${id}`);
  }

  createEntretien(entretien: Entretien): Observable<Entretien> {
    return this.http.post<Entretien>(this.apiUrl, entretien);
  }

  updateEntretien(id: number, entretien: Entretien): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.apiUrl}/${id}`, entretien);
  }

  deleteEntretien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEntretiensByVehicule(vehiculeId: number): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`http://localhost:8000/api/vehicules/${vehiculeId}/entretiens`);
  }

  getTypesEntretien(): string[] {
    return [
      'Vidange',
      'Contrôle technique',
      'Pneumatiques',
      'Freinage',
      'Climatisation',
      'Batterie',
      'Carrosserie',
      'Autre'
    ];
  }

  getStatuts(): { [key: string]: string } {
    return {
      'planifié': 'Planifié',
      'effectué': 'Effectué',
      'annulé': 'Annulé',
      'reporté': 'Reporté'
    };
  }
}
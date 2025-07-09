import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

interface Alerte {
  id: number;
  vehicule_id: number;
  marque: string;
  modele: string;
  immatriculation: string;
  date_fin: string;
  jours_restants: number;
  urgence: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  private apiUrl = `${environment.apiUrl}/alertes`;
  private alertesSubject = new BehaviorSubject<Alerte[]>([]);
  alertes$ = this.alertesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAlertes();
  }

  loadAlertes(): void {
    this.http.get<Alerte[]>(`${this.apiUrl}/assurances`).subscribe({
      next: (alertes) => this.alertesSubject.next(alertes),
      error: (err) => console.error('Erreur:', err)
    });
  }

  marquerCommeTraitee(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/assurances/${id}/marquer-traitee`, {});
  }
}
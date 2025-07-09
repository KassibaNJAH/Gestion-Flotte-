import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ControleTechnique } from '../models/controle-technique.model';

@Injectable({
  providedIn: 'root'
})
export class ControleTechniqueService {
  private apiUrl = 'http://localhost:8000/api/controle-techniques';

  constructor(private http: HttpClient) { }

  getControles(): Observable<ControleTechnique[]> {
    return this.http.get<ControleTechnique[]>(this.apiUrl);
  }

  getControle(id: number): Observable<ControleTechnique> {
    return this.http.get<ControleTechnique>(`${this.apiUrl}/${id}`);
  }

  createControle(controle: ControleTechnique): Observable<ControleTechnique> {
    return this.http.post<ControleTechnique>(this.apiUrl, controle);
  }

  updateControle(id: number, controle: ControleTechnique): Observable<ControleTechnique> {
    return this.http.put<ControleTechnique>(`${this.apiUrl}/${id}`, controle);
  }

  deleteControle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getControlesByVehicule(vehiculeId: number): Observable<ControleTechnique[]> {
    return this.http.get<ControleTechnique[]>(`http://localhost:8000/api/vehicules/${vehiculeId}/controle-techniques`);
  }
}
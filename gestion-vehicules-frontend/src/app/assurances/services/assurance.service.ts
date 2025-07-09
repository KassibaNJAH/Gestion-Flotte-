import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assurance } from '../models/assurance.model';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  private apiUrl = 'http://localhost:8000/api/assurances';

  constructor(private http: HttpClient) { }

  getAssurances(): Observable<Assurance[]> {
    return this.http.get<Assurance[]>(this.apiUrl);
  }

  getAssurance(id: number): Observable<Assurance> {
    return this.http.get<Assurance>(`${this.apiUrl}/${id}`);
  }

  createAssurance(assurance: Assurance): Observable<Assurance> {
    return this.http.post<Assurance>(this.apiUrl, assurance);
  }

  updateAssurance(id: number, assurance: Assurance): Observable<Assurance> {
    return this.http.put<Assurance>(`${this.apiUrl}/${id}`, assurance);
  }

  deleteAssurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAssurancesByVehicule(vehiculeId: number): Observable<Assurance[]> {
    return this.http.get<Assurance[]>(`http://localhost:8000/api/vehicules/${vehiculeId}/assurances`);
  }
}
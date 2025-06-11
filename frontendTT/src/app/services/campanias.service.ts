import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CampaniasService {
  private apiUrl = 'http://localhost:8000/api/campanias';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getCampanias(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  crearCampania(campania: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campania, { headers: this.getHeaders() });
  }

  actualizarCampania(id: number, campania: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, campania, { headers: this.getHeaders() });
  }
}

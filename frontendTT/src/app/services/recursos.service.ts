import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getRecursos(partidaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recursos/${partidaId}`, {
      withCredentials: true
    });
  }

  
  subirRecurso(
    partidaId: number,
    titulo: string,
    tipo: string,
    archivo: File,
    descripcion?: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('partida_id', partidaId.toString());
    formData.append('titulo', titulo);
    formData.append('tipo', tipo);
    formData.append('archivo', archivo);
    if (descripcion) formData.append('descripcion', descripcion);

    return this.http.post<any>(`${this.apiUrl}/recursos`, formData, {
      withCredentials: true
    });
  }

  
  eliminarRecurso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/recursos/${id}`, {
      withCredentials: true
    });
  }

  cambiarVisibilidad(id: number, visible: boolean): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/recursos/${id}/visibilidad`,
      { visible },
      { withCredentials: true }
    );
  }
}

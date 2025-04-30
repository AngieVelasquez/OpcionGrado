import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private apiUrl = `${environment.apiUrl}/Sesion`;

  constructor(private http: HttpClient) { }

  crearSesion(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, dto);
  }

  obtenerSesiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtener`);
  }
}

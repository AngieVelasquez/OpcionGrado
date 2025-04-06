import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Convocatoria } from '../model/Convocatoria.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  convocatoriaSeleccionada?: Convocatoria;
  private apiUrl = `${environment.apiUrl}/Convocatoria`;

  constructor(private http: HttpClient) {}

  crearConvocatoria(convocatoria: Convocatoria): Observable<any> {
    console.log('Objeto convocatoria a enviar:', convocatoria);
    return this.http.post<any>(`${this.apiUrl}/CrearConvocatoria`, convocatoria);
  }
  
  obtenerConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${this.apiUrl}/obtener`);
  }

  obtenerConvocatoriaPorId(id: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(`${this.apiUrl}/${id}`);
  }

  actualizarConvocatoria(id: number, convocatoria: Convocatoria): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${id}`, convocatoria);
  }

  eliminarConvocatoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }

  actualizarEstado(id: number, estado: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/estado/${id}`, { NuevoEstado: estado });
  }
}

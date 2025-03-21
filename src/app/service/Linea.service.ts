// src/app/service/Linea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Linea } from '../model/Linea.model';

@Injectable({
  providedIn: 'root'
})
export class LineaService {
    private apiUrl = 'https://localhost:7234/api/LineaProfundizacion';

  constructor(private http: HttpClient) { }

  getLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(`${this.apiUrl}/ObtenerLineas`);
  }

  crearLinea(linea: Linea): Observable<Linea> {
    console.log("Enviando línea:", linea); // ✅ Depuración

    return this.http.post<Linea>(`${this.apiUrl}/CrearLinea`, linea);
  }

  actualizarLinea(linea: Linea): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/EditarLinea`, linea); 
  }

  eliminarLinea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/EliminarLinea/${id}`);
  }
}
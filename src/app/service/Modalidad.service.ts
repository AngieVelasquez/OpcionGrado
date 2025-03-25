    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { Modalidad } from '../model/Modalidad.model'; // Asegúrate de que el nombre sea correcto

    @Injectable({
    providedIn: 'root'
    })
    export class ModalidadService {
        private apiUrl = 'https://localhost:7234/api/Modalidad';

    constructor(private http: HttpClient) { }

    getModalidad(): Observable<Modalidad[]> {
        return this.http.get<Modalidad[]>(`${this.apiUrl}/obtener`);
    }

    /*crearObjetivo(objetivo: Objetivo): Observable<any> {
        return this.http.post(`${this.apiUrl}/crear`, objetivo);
    }
    eliminarObjetivo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    actualizarObjetivo(objetivo: Objetivo): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editar`, objetivo);
      }*/
    }

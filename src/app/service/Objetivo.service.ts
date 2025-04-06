    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { Objetivo } from '../model/Objetivo.model'; 
import { environment } from 'src/environment/environment.development';

    @Injectable({
    providedIn: 'root'
    })
    export class ObjetivoService {
          private apiUrl = `${environment.apiUrl}/objetivo`;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    };

    constructor(private http: HttpClient) { }

    getObjetivos(): Observable<Objetivo[]> {
        return this.http.get<Objetivo[]>(`${this.apiUrl}/obtener`);
    }

    crearObjetivo(objetivo: Objetivo): Observable<any> {
        return this.http.post(`${this.apiUrl}/crear`, objetivo);
    }
    eliminarObjetivo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    actualizarObjetivo(objetivo: Objetivo): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editar`, objetivo);
      }
    }

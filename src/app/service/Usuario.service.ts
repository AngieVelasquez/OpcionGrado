import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment.development';
import { Usuario } from '../model/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl =  `${environment.apiUrl}/Usuario`;
  
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/ObtenerPorCorreo`).pipe(
      tap((response) => {
        console.log('Respuesta de la API:', response);
      })
    );
  }
  
}

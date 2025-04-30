import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment.development';
import { Usuario } from '../model/Usuario.model';
import { LoginRequest } from '../model/LoginRequest.model';

@Injectable({
  providedIn: 'root'
})  
export class UsuarioService {
  private apiUrl =  `${environment.apiUrl}/Login`;
  
  constructor(private http: HttpClient) { }

  loginUsuario(credentials: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/LoginUsuario`, credentials, {
     withCredentials: true,
    }).pipe(
      tap((response) => {
        console.log('Respuesta de la API:', response);
      })
    );
  }
  
}

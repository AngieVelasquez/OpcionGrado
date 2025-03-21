import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'https://localhost:7234';
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
  
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); 
          console.log('Token guardado:', response.token);
        }
      })
    );
  }
  }


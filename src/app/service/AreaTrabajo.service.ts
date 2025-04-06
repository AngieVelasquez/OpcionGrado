import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.development';
import { AreaTrabajo } from '../model/AreaTrabajo.model';
@Injectable({
  providedIn: 'root'
})
export class AreaTrabajoService {
  private apiUrl = `${environment.apiUrl}/AreaTrabajo`;

constructor(private http: HttpClient) { }

 crearAreaTrabajo(AreaTrabajo: AreaTrabajo): Observable<any> {
    console.log('Objeto convocatoria a enviar:', AreaTrabajo);
    return this.http.post<any>(`${this.apiUrl}/CrearAreaTrabajo`, AreaTrabajo);
  }
  
  obtenerAreasTrabajo(): Observable<AreaTrabajo[]> {
    return this.http.get<AreaTrabajo[]>(`${this.apiUrl}/ObtenerArea`);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearConvocatoriaComponent } from './view/crear-convocatoria/crear-convocatoria.component';
import { VerConvocatoriasComponent } from './view/ver-convocatorias/ver-convocatorias.component';
import { VerConvocatoriaComponent } from './view/ver-convocatoria/ver-convocatoria.component';
import { PrincipalComponent } from './view/principal/principal.component';
import { InscripcionGrupoComponent } from './view/inscripcion-grupo/inscripcion-grupo.component';
import { GestionarProyectoComponent } from './view/gestionar-proyecto/gestionar-proyecto.component';
import { InscripcionesGruposComponent } from './view/inscripciones-grupos/inscripciones-grupos.component';
import { IndicadoresCoberturaComponent } from './view/IndicadoresCobertura/IndicadoresCobertura.component';
import { NotFoundComponent } from './view/NotFound/NotFound.component';
import { ConfiguracionComponent } from './view/Configuracion/Configuracion.component';
import { VerGrupoComponent } from './view/VerGrupo/VerGrupo.component';
import { RolesPermisosComponent } from './view/RolesPermisos/RolesPermisos.component';

const routes: Routes = [
  { path : '', redirectTo:'/principal', pathMatch: 'full'},
  { path : 'crear-convocatoria', component: CrearConvocatoriaComponent},
  { path : 'ver-convocatorias', component: VerConvocatoriasComponent},
  { path : 'ver-convocatoria', component: VerConvocatoriaComponent },
  { path : 'inscripcion-grupo', component: InscripcionGrupoComponent},
  { path : 'gestionar-proyecto', component: GestionarProyectoComponent},
  { path : 'inscripciones-grupos', component: InscripcionesGruposComponent},
  { path :  'IndicadoresCobertura', component: IndicadoresCoberturaComponent},
  { path :  'Configuracion', component: ConfiguracionComponent},
  { path : 'roles-permisos', component: RolesPermisosComponent},
  { path : 'VerGrupo', component: VerGrupoComponent},
  { path: 'principal', component: PrincipalComponent},
  { path: '**', component: NotFoundComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

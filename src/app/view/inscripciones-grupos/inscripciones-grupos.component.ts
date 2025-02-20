import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/services/menu.service';

@Component({
  selector: 'app-inscripciones-grupos',
  templateUrl: './inscripciones-grupos.component.html',
  styleUrls: ['./inscripciones-grupos.component.css']
})
export class InscripcionesGruposComponent implements OnInit {
  isSidebarReduced: boolean = false;

 constructor(private menuService: MenuService) {}
 proyectos = [
  { nombreGrupo: 'Grupo Alpha', lider: 'Juan Pérez', fechaInscripcion: '02-10-2025', descripcion: 'Desarrollo de software para educación.', numerocedula: '1006507972', telefono: '3102268473', correo: 'edi.ramos@udla.edu.co' },
  { nombreGrupo: 'Innovatech', lider: 'María Gómez', fechaInscripcion: '02-12-2025', descripcion: 'Prototipo de robot asistente.', numerocedula: '11193355429' , telefono: '3102268473', correo: 'edi.ramos@udla.edu.co'},
  { nombreGrupo: 'EcoSmart', lider: 'Carlos Ramírez', fechaInscripcion:'02-15-2025', descripcion: 'Sistema de reciclaje inteligente.', numerocedula: '30506761', telefono: '3102268473', correo: 'edi.ramos@udla.edu.co' }

];

proyectoSeleccionado: any = null;

seleccionarProyecto(proyecto: any) {
  this.proyectoSeleccionado = proyecto;
}

aceptarProyecto(proyecto: any) {
  alert(`Proyecto "${proyecto.nombreGrupo}" aceptado.`);
  this.proyectoSeleccionado = null;
}

rechazarProyecto(proyecto: any) {
  alert(`Proyecto "${proyecto.nombreGrupo}" rechazado.`);
  this.proyectoSeleccionado = null;
}
  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }
  Salir() {
    window.location.href = '/principal';
  }
  cerrarproyecto(){
    window.location.href = 'inscripciones-grupos  '
  }
  isOpen = false;

  toggleAcordeon() {
    this.isOpen = !this.isOpen;
  }
  
}

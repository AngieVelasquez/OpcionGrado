import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-RolesPermisos',
  templateUrl: './RolesPermisos.component.html',
  styleUrls: ['./RolesPermisos.component.css']
})
export class RolesPermisosComponent implements OnInit {
  isSidebarReduced: boolean = false;
  mostrarModal = false;
  nuevoRol = { nombre: '', descripcion: '', color: '', todosLosPermisos: false };
  colores = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0', '#e91e63'];

  mostrarModalEditar = false;
  rolEditable: any = {};
  rolSeleccionado = {
    nombre: 'Estudiante',
    descripcion: 'Participar en proyectos',
    color: '#fbc02d',
    permisos: [
      {
        nombre: 'Proyectos',
        items: [
          { nombre: 'Ver Proyectos', activo: true },
          { nombre: 'Crear Proyectos', activo: false },
          { nombre: 'Editar Proyectos', activo: false },
          { nombre: 'Eliminar Proyectos', activo: false }
        ]
      },
      {
        nombre: 'Convocatorias',
        items: [
          { nombre: 'Ver Convocatorias', activo: false },
          { nombre: 'Crear Convocatorias', activo: false },
          { nombre: 'Editar Convocatorias', activo: false }
        ]
      },
      {
        nombre: 'Usuarios',
        items: [
          { nombre: 'Gestionar Usuarios', activo: false }
        ]
      }
    ]
  };
  
  constructor(private menuService: MenuService) { }


  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
    this.isSidebarReduced = isReduced;
    });
  }
  permisosDisponibles = [
    {
      nombre: 'Dashboard',
      permisos: [
        { nombre: 'Ver Dashboard', activo: false }
      ]
    },
    {
      nombre: 'Reportes',
      permisos: [
        { nombre: 'Ver Reportes', activo: false },
        { nombre: 'Exportar Reportes', activo: false }
      ]
    },
    {
      nombre: 'Proyectos',
      permisos: [
        { nombre: 'Ver Proyectos', activo: false },
        { nombre: 'Crear Proyectos', activo: false },
        { nombre: 'Editar Proyectos', activo: false },
        { nombre: 'Eliminar Proyectos', activo: false }
      ]
    }
  ];
  
  abrirModalNuevoRol() {
    this.mostrarModal = true;
  }
  
  cerrarModal() {
    this.mostrarModal = false;
  }
  
  seleccionarColor(color: string) {
    this.nuevoRol.color = color;
  }
  
  guardarRol() {
    console.log('Rol guardado:', this.nuevoRol);
    this.cerrarModal();
  }
  abrirModalEditarRol(rol: any) {
    this.rolEditable = JSON.parse(JSON.stringify(rol)); // Clonamos para no afectar original
    this.mostrarModalEditar = true;
  }
  
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }
  
  guardarCambiosRol() {
    console.log('Cambios guardados', this.rolEditable);
    this.mostrarModalEditar = false;
    // Aquí iría lógica para enviar al backend
  }
}

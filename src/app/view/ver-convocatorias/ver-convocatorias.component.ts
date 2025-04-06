import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { ConvocatoriaService } from 'src/app/service/Convocatoria.service';
import { Convocatoria } from 'src/app/model/Convocatoria.model';

@Component({
  selector: 'app-ver-convocatorias',
  templateUrl: './ver-convocatorias.component.html',
  styleUrls: ['./ver-convocatorias.component.css']
})
export class VerConvocatoriasComponent implements OnInit {
  isSidebarReduced: boolean = false;
  mostrarOpciones: boolean = false;
  filtroSeleccionado: string = 'activos';
  convocatorias: Convocatoria[] = [];
  router: any;

  constructor(
    private menuService: MenuService,
    private convocatoriaService: ConvocatoriaService
  ) {}

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
    this.cargarConvocatorias();
  }

  cargarConvocatorias(): void {
    this.convocatoriaService.obtenerConvocatorias().subscribe(
      (data: Convocatoria[]) => {
        console.log('📦 Convocatorias recibidas del backend:', data); 
        const fechaActual = new Date();

        this.convocatorias = data.map(convocatoria => {
          const fechaInicio = convocatoria.fechaInicio ? new Date(convocatoria.fechaInicio) : null;
          const fechaFin = convocatoria.fechaFin ? new Date(convocatoria.fechaFin) : null;
          
          const nuevaConvocatoria = {
            ...convocatoria,
            estado: (fechaInicio && fechaFin && fechaActual >= fechaInicio && fechaActual <= fechaFin)
              ? 'Activa'
              : 'Inactiva'
          };
          

          if (nuevaConvocatoria.estado === 'Inactiva' && convocatoria.estado === '1' && convocatoria.id !== undefined) {
            this.actualizarEstadoConvocatoria(convocatoria.id, 0);
          }
          return nuevaConvocatoria;
        });
      },
      (error) => {
        console.error('Error al cargar las convocatorias:', error);
      }
    );
  }

  actualizarEstadoConvocatoria(id: number, nuevoEstado: number): void {
    this.convocatoriaService.actualizarEstado(id, nuevoEstado).subscribe(
      () => {
        console.log(`Estado de la convocatoria ${id} actualizado a ${nuevoEstado}`);
      },
      (error) => {
        console.error(`Error al actualizar el estado de la convocatoria ${id}:`, error);
      }
    );
  }

  Salir() {
    window.location.href = '/principal';
  }

  toggleFiltro() {
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    this.mostrarOpciones = false;
  }

  get convocatoriasFiltradas() {
    if (this.filtroSeleccionado === 'todos') {
      return this.convocatorias;
    }
    return this.convocatorias.filter(c => c.estado === 'Activa');
  }
  verDetalle(convocatoria: Convocatoria) {
    this.convocatoriaService.convocatoriaSeleccionada = convocatoria;
    this.router.navigate(['/ver-convocatoria']);
  }

formatearFecha(fecha: any): string {
  const date = new Date(fecha);
  return !isNaN(date.getTime()) ? date.toLocaleDateString('es-CO') : 'No disponible';
}


}

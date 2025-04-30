import { Component, OnInit } from '@angular/core';
import { AreaTrabajo } from 'src/app/model/AreaTrabajo.model';
import { Linea } from 'src/app/model/Linea.model';
import { Objetivo } from 'src/app/model/Objetivo.model';
import { LineaService } from 'src/app/service/Linea.service';
import { MenuService } from 'src/app/service/menu.service';
import { ObjetivoService } from 'src/app/service/Objetivo.service';
import { AreaTrabajoService } from 'src/app/service/AreaTrabajo.service';
@Component({
  selector: 'app-IndicadoresCobertura',
  templateUrl: './IndicadoresCobertura.component.html',
  styleUrls: ['./IndicadoresCobertura.component.css']
})
export class IndicadoresCoberturaComponent implements OnInit {
  isSidebarReduced: boolean = false;
  isModalOpen: boolean = false;
  router: any;
  alerta: string | null = null;

  constructor(private menuService: MenuService, 
              private objetivoService: ObjetivoService, 
              private lineaService: LineaService,
               private AreaTrabajo: AreaTrabajoService) 
  { }

  ngOnInit() {
    this.secciones.forEach(seccion => {
      seccion.paginaActual = 1;
      seccion.itemsPorPagina = 3;
      this.recargarSeccion(seccion.key);
    });
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }
    
  
  secciones = [
    {
      key: 'areas',
      titulo: 'Áreas de Trabajo',
      nombreSingular: 'área',
      items: [] as {nombre: string, descripcion: string }[],
      nuevo: '',
      alerta: '', 
      abierto: true,
      paginaActual: 1,
      itemsPorPagina: 3
    },
    {
      key: 'ciclo',
      titulo: 'Población por Ciclo de Vida',
      nombreSingular: 'ciclo',
      items: [] as {nombre: string, descripcion: string }[],
      nuevo: '',
      alerta: '', 
      abierto: false,
      paginaActual: 1,
      itemsPorPagina: 3
    },
    {
      key: 'condicion',
      titulo: 'Población por Condición',
      nombreSingular: 'condición',
      items: [] as {nombre: string, descripcion: string }[],
      nuevo: '',
      alerta: '', 
      abierto: false,
      paginaActual: 1,
      itemsPorPagina: 3
    },
    {
      key: 'lineas',
      titulo: 'Líneas de Profundización',
      nombreSingular: 'línea',
      items: [] as {nombre: string, descripcion: string }[],
      nuevo: '',
      alerta: '', 
      abierto: false,
      paginaActual: 1,
      itemsPorPagina: 3
    },

  ];
  
  servicios = {
    objetivos: {
      obtener: () => this.objetivoService.getObjetivos(),
      crear: (data: Objetivo) => this.objetivoService.crearObjetivo(data),
      eliminar: (id: number) => this.objetivoService.eliminarObjetivo(id),
      actualizar: (data: Objetivo) => this.objetivoService.actualizarObjetivo(data),
    },
    lineaService: {
      obtener: () => this.lineaService.getLineas(),
      crear: (data: Linea) => this.lineaService.crearLinea(data),
      eliminar: (id: number) => this.lineaService.eliminarLinea(id),
      actualizar: (data: Linea) => this.lineaService.actualizarLinea(data),
    },
    AreaTrabajo: {
      obtener: () => this.AreaTrabajo.obtenerAreasTrabajo(),
      crear: (data: AreaTrabajo) => this.AreaTrabajo.crearAreaTrabajo(data),
    }
  
  }
  recargarSeccion(key: string): void {
    switch (key) {
      case 'objetivos':
        this.objetivoService.getObjetivos().subscribe({
          next: (data: Objetivo[]) => {
            const seccion = this.obtenerSeccion(key);
            if (seccion) {
              seccion.items = data.map(obj => ({
                nombre: obj.nombre,
                descripcion: obj.descripcion
              }));
            }
          },
          error: err => console.error('Error al cargar objetivos:', err)
        });
        break;
        case 'lineas':
          this.lineaService.getLineas().subscribe({
            next: (data: any[]) => {
              const seccion = this.obtenerSeccion(key);
              if (seccion) {
                seccion.items = data.map(linea => ({
                  nombre: linea.nombre
                , descripcion: linea.descripcion
                }));
              }
            },
            error: err => console.error('Error al cargar líneas:', err)
          });
          break;
      case 'areas':
        this.AreaTrabajo.obtenerAreasTrabajo().subscribe({
          next: (data: AreaTrabajo[]) => {
            const seccion = this.obtenerSeccion(key);
            if (seccion) {
              seccion.items = data.map(area => ({
                nombre: area.nombre,
                descripcion: area.descripcion
              }));
            }
          },
          error: err => console.error('Error al cargar áreas de trabajo:', err)
        });
        break;
    
      default:
        console.warn(`No hay servicio para la clave '${key}'`);
        break;
    }
  }

  agregar(seccionKey: string): void {
    const seccion = this.obtenerSeccion(seccionKey);
    if (!seccion) return;
  
    switch (seccionKey) {

      case 'lineas':
        if (!seccion.nuevo) return;
        const nuevaLinea: Linea = {
          idLinea: '',
          nombre: seccion.nuevo
        };
        this.lineaService.crearLinea(nuevaLinea).subscribe({
          next: () => {
            this.recargarSeccion(seccionKey);
            seccion.nuevo = '';
            seccion.alerta = '✅ ¡Linea creada con éxito!';
            setTimeout(() => seccion.alerta = '', 3000); 

          },
          error: err => console.error('Error al crear línea:', err)
        });
        break;
      case 'areas':
          if (!seccion.nuevo) return;
          const nuevaAreaTrabajo: AreaTrabajo = {
            idAreas_Trabajo: 1,
            nombre: seccion.nuevo,
            descripcion: "",
            Estado: 1
          };
          this.AreaTrabajo.crearAreaTrabajo(nuevaAreaTrabajo).subscribe({
          next: () => {
              this.recargarSeccion(seccionKey);
              seccion.nuevo = '';
              seccion.alerta = '✅ ¡Área de trabajo creada con éxito!';
              setTimeout(() => seccion.alerta = '', 3000);
            },
            error: err => console.error('Error al crear área de trabajo:', err)
          });
        break;
  
  
      default:
        console.warn(`No hay lógica de creación para la sección: ${seccionKey}`);
    }
  }
  
  toggleSeccion(key: string): void {
    const seccion = this.secciones.find(s => s.key === key);
    if (seccion) {
      seccion.abierto = !seccion.abierto;
    }
  }
  
  obtenerSeccion(key: string) {
    return this.secciones.find(sec => sec.key === key);
  }
  getItemsPaginados(seccion: any): any[] {
    const inicio = (seccion.paginaActual - 1) * seccion.itemsPorPagina;
    const fin = inicio + seccion.itemsPorPagina;
    return seccion.items.slice(inicio, fin);
  }
  
  getTotalPaginas(seccion: any): number {
    return Math.ceil(seccion.items.length / seccion.itemsPorPagina);
  }
  
  cambiarPagina(key: string, nuevaPagina: number): void {
    const seccion = this.obtenerSeccion(key);
    if (seccion) {
      seccion.paginaActual = nuevaPagina;
    }
  }
  
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
 Salir() {
    this.router.navigate(['/principal']);
  }
}

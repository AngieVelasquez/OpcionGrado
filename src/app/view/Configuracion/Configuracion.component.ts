import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { SesionService } from 'src/app/service/Sesion.service';

@Component({
  selector: 'app-Configuracion',
  templateUrl: './Configuracion.component.html',
  styleUrls: ['./Configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  isSidebarReduced: boolean = false;
  tipoSeleccionado: string = '';

  codigoInput: string = '';
  descripcionInput: string = '';

  historial: { 
    tipo: string;
    codigo: string;
    descripcion: string;
    seccion?: string;
    division?: string;
    grupo?: string;
    clase?: string;
    unidad?: string;
  }[] = [];

  secciones: any[] = [];
  divisiones: any[] = [];
  grupos: any[] = [];
  clases: any[] = [];
  subclases: any[] = [];
  unidadesMedida: any[] = [];

  selectedSeccion: string = '';
  selectedDivision: string = '';
  selectedGrupo: string = '';
  selectedClase: string = '';
  selectedUnidad: string = '';

  historialAgrupado: any[] = [];
  historialPaginaActual: number = 1;
  historialItemsPorPagina: number = 6; 

  mensajeToast: string = '';
  mostrarToastExito: boolean = false;
  mensajeToastExito: string = '';

  constructor(private menuService: MenuService, 
            private sesionService: SesionService
  ) { }

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
    this.isSidebarReduced = isReduced;
    });
  
  this.sesionService.obtenerSesiones().subscribe({
    next: (sesiones) => {
      this.historial = sesiones.map(s => ({
        tipo: 'seccion',
        codigo: s.codigo,
        descripcion: s.nombre,
        seccion: '',
        division: '',
        grupo: '',
        clase: '',
        unidad: ''
      }));
      
      this.organizarHistorial();

      // Y también llenas secciones, divisiones, grupos, etc.
      this.secciones = this.historial.filter(h => h.tipo === 'seccion');
      this.divisiones = this.historial.filter(h => h.tipo === 'division');
      this.grupos = this.historial.filter(h => h.tipo === 'grupo');
      this.clases = this.historial.filter(h => h.tipo === 'clase');
      this.subclases = this.historial.filter(h => h.tipo === 'subclase');
      this.unidadesMedida = this.historial.filter(h => h.tipo === 'unidad');
    },
    error: (error) => {
      console.error('Error al cargar secciones', error);
      this.mostrarToast('Error al cargar secciones');
    }
  });
  }
  obtenerTitulo(tipo: string): string {
    switch (tipo) {
      case 'seccion': return '1. Sección';
      case 'division': return '2. División';
      case 'grupo': return '3. Grupo';
      case 'clase': return '4. Clase';
      case 'subclase': return '5. Subclase';
      case 'unidad': return '6. Unidad de Medida';
      default: return '';
    }
  }
  crearItem(): void {
    if (!this.codigoInput || !this.descripcionInput) {
      this.mostrarToast('Por favor complete Código y Descripción');
      return;
    }
  
    let codigoFinal = '';
    let descripcionFinal = this.descripcionInput.trim();
  
    switch (this.tipoSeleccionado) {
      case 'seccion':
        codigoFinal = String(this.codigoInput);
        break;
      case 'division':
        const seccionPadre = this.secciones.find(s => s.codigo === this.selectedSeccion);
        if (!seccionPadre) {
          alert('Debe seleccionar una Sección válida');
          return;
        }
        codigoFinal = `${seccionPadre.codigo}.${this.codigoInput}`;
        break;
      case 'grupo':
        const divisionPadre = this.divisiones.find(d => d.codigo === this.selectedDivision);
        if (!divisionPadre) {
          alert('Debe seleccionar una División válida');
          return;
        }
        codigoFinal = `${divisionPadre.codigo}.${this.codigoInput}`;
        break;
      case 'clase':
        const grupoPadre = this.grupos.find(g => g.codigo === this.selectedGrupo);
        if (!grupoPadre) {
          alert('Debe seleccionar un Grupo válido');
          return;
        }
        codigoFinal = `${grupoPadre.codigo}.${this.codigoInput}`;
        break;
      case 'subclase':
        const clasePadre = this.clases.find(c => c.codigo === this.selectedClase);
        if (!clasePadre) {
          alert('Debe seleccionar una Clase válida');
          return;
        }
        codigoFinal = `${clasePadre.codigo}.${this.codigoInput}`;
        if (this.selectedUnidad) {
          descripcionFinal += ` (${this.selectedUnidad})`;
        }
        break;
      case 'unidad':
        codigoFinal = typeof this.codigoInput === 'string' ? this.codigoInput.trim() : String(this.codigoInput);
        break;
    }
  
    const dtoCrear = {
      nombre: descripcionFinal,
      codigo: Number(codigoFinal)
    };
  
    this.sesionService.crearSesion(dtoCrear).subscribe({
      next: (response) => {
        const newItem = {
          tipo: this.tipoSeleccionado,
          codigo: codigoFinal,
          descripcion: descripcionFinal,
          seccion: this.tipoSeleccionado !== 'seccion' ? this.selectedSeccion : '',
          division: ['grupo', 'clase', 'subclase'].includes(this.tipoSeleccionado) ? this.selectedDivision : '',
          grupo: ['clase', 'subclase'].includes(this.tipoSeleccionado) ? this.selectedGrupo : '',
          clase: ['subclase'].includes(this.tipoSeleccionado) ? this.selectedClase : '',
          unidad: this.tipoSeleccionado === 'subclase' ? this.selectedUnidad : ''
        };
  
        this.historial.push(newItem);
        this.organizarHistorial();
  
        switch (this.tipoSeleccionado) {
          case 'seccion':
            this.secciones.push(newItem);
            break;
          case 'division':
            this.divisiones.push(newItem);
            break;
          case 'grupo':
            this.grupos.push(newItem);
            break;
          case 'clase':
            this.clases.push(newItem);
            break;
          case 'subclase':
            this.subclases.push(newItem);
            break;
          case 'unidad':
            this.unidadesMedida.push(newItem);
            break;
        }
  
        this.codigoInput = '';
        this.descripcionInput = '';
        this.selectedDivision = '';
        this.selectedGrupo = '';
        this.selectedClase = '';
        this.selectedUnidad = '';
        this.tipoSeleccionado = '';
  
        this.mostrarToastCreado(`¡${this.obtenerTitulo(this.tipoSeleccionado).replace(/\d\.\s/, '')} creada exitosamente!`);
      },
      error: (error) => {
        console.error('Error al crear la sesión', error);
        this.mostrarToast('Error al crear el código');
      }
    });
  }
  

    organizarHistorial(): void {
      const agrupado: any = [];
    
      for (const item of this.historial) {
        if (item.tipo === 'seccion') {
          agrupado.push({ ...item, divisiones: [] });
        }
    
        if (item.tipo === 'division') {
          const seccionPadre = agrupado.find((s: { codigo: string | undefined; }) => s.codigo === item.seccion);
          if (seccionPadre) {
            seccionPadre.divisiones.push({ ...item, grupos: [] });
          }
        }
    
        if (item.tipo === 'grupo') {
          for (const seccion of agrupado) {
            const divisionPadre = seccion.divisiones.find((d: { codigo: string | undefined; }) => d.codigo === item.division);
            if (divisionPadre) {
              divisionPadre.grupos.push({ ...item, clases: [] });
            }
          }
        }
    
        if (item.tipo === 'clase') {
          for (const seccion of agrupado) {
            for (const division of seccion.divisiones) {
              const grupoPadre = division.grupos.find((g: { codigo: string | undefined; }) => g.codigo === item.grupo);
              if (grupoPadre) {
                grupoPadre.clases.push({ ...item, subclases: [] });
              }
            }
          }
        }
    
        if (item.tipo === 'subclase') {
          for (const seccion of agrupado) {
            for (const division of seccion.divisiones) {
              for (const grupo of division.grupos) {
                const clasePadre = grupo.clases.find((c: { codigo: string | undefined; }) => c.codigo === item.clase);
                if (clasePadre) {
                  clasePadre.subclases.push({ ...item });
                }
              }
            }
          }
        }
      }

    this.historialAgrupado = agrupado;
  }
    // Para identar visualmente
  getIndentacion(tipo: string): number {
    switch (tipo) {
      case 'seccion': return 0;
      case 'division': return 3;
      case 'grupo': return 4;
      case 'clase': return 5;
      case 'subclase': return 6;
      default: return 0;
    }
  }

    get historialVisual(): any[] {
      const visual: any[] = [];
      
      for (const seccion of this.historialAgrupado) {
        visual.push({ tipo: 'seccion', ...seccion });
      
        for (const division of seccion.divisiones) {
          visual.push({ tipo: 'division', ...division });
      
          for (const grupo of division.grupos) {
            visual.push({ tipo: 'grupo', ...grupo });
      
            for (const clase of grupo.clases) {
              visual.push({ tipo: 'clase', ...clase });
      
              for (const subclase of clase.subclases) {
                visual.push({ tipo: 'subclase', ...subclase });
                }
              }
            }
          }
        }
      
        return visual;
      }  
      get historialPaginado(): any[] {
        const inicio = (this.historialPaginaActual - 1) * this.historialItemsPorPagina;
        const fin = inicio + this.historialItemsPorPagina;
        return this.historialVisual.slice(inicio, fin);
      }
      
      get totalPaginas(): number {
        return Math.ceil(this.historialVisual.length / this.historialItemsPorPagina);
      }
      
      anteriorPagina() {
        if (this.historialPaginaActual > 1) {
          this.historialPaginaActual--;
        }
      }
      
      siguientePagina() {
        if (this.historialPaginaActual < this.totalPaginas) {
          this.historialPaginaActual++;
        }
      }
      
      paginasArray(): number[] {
        return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
      }
      
      irAPagina(pagina: number) {
        this.historialPaginaActual = pagina;
      }
      mostrarToast(mensaje: string) {
        this.mensajeToast = mensaje;
        const toastElemento = document.getElementById('toastAlerta');
        if (toastElemento) {
          const toastBootstrap = new (window as any).bootstrap.Toast(toastElemento);
          toastBootstrap.show();
        }
      }
      
      cerrarToast() {
        const toastElemento = document.getElementById('toastAlerta');
        if (toastElemento) {
          const toastBootstrap = (window as any).bootstrap.Toast.getInstance(toastElemento);
          toastBootstrap?.hide();
        }
      }
      mostrarToastCreado(mensaje: string) {
        this.mensajeToastExito = mensaje;
        this.mostrarToastExito = true;
      
        setTimeout(() => {
          this.mostrarToastExito = false;
        }, 2000); 
      }
      
      cerrarToastExito() {
        this.mostrarToastExito = false;
      }
}

   


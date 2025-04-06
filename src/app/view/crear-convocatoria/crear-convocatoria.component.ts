import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Convocatoria } from 'src/app/model/Convocatoria.model';
import { Modalidad } from 'src/app/model/Modalidad.model';
import { Objetivo } from 'src/app/model/Objetivo.model';
import { ConvocatoriaService } from 'src/app/service/Convocatoria.service';
import { LineaService } from 'src/app/service/Linea.service';
import { MenuService } from 'src/app/service/menu.service';
import { ModalidadService } from 'src/app/service/Modalidad.service';
import { ObjetivoService } from 'src/app/service/Objetivo.service';

declare var bootstrap: any;

@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crear-convocatoria.component.html',
  styleUrls: ['./crear-convocatoria.component.css']
})
export class CrearConvocatoriaComponent implements OnInit {
  isSidebarReduced: boolean = false;
  isCollapsed: boolean = true;
  
  selectedOption: { idLinea: string, nombre: string } | null = null;
  selectedOptions: { idLinea: string, nombre: string }[] = [];
  selectedModalidad: string = '';
  
  fechaInicio: string = new Date().toISOString().split('T')[0];
  fechaFin: string = new Date().toISOString().split('T')[0];
  
  objetivos: Objetivo[] = []; 
  objetivosSeleccionados: Objetivo[] = []; 
  objetivosGuardados: Objetivo[] = [];
  lineas: { idLinea: string, nombre: string }[] = [];
  Modalidades: Modalidad[] = [];
  
  nuevoObjetivoForm!: FormGroup;
  nuevaLineaForm!: FormGroup;
  
  objetivoEditado: Objetivo | null = null;

  convocatoria: Convocatoria = {
    titulo: '',
    resolucion: '',
    numeroResolucion: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(), 
    duracion: 0,
    modalidadId: 0,
    objetivos: [],	
    lineas: [],
  };

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private objetivoService: ObjetivoService,
    private lineaService: LineaService,
    private modalidadService: ModalidadService,
    private convocatoriaService: ConvocatoriaService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.inicializarFormularios();
  }

  ngOnInit(): void {
    this.convocatoria.fechaInicio = new Date();
    this.cargarLineas();
    this.inicializarComponente();
  }

  private inicializarFormularios(): void {
    this.nuevoObjetivoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.nuevaLineaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  private inicializarComponente(): void {
    this.cargarDatosIniciales();
    this.suscribirMenu();
  }

  private cargarDatosIniciales(): void {
    this.cargarModalidades();
    this.recargarObjetivos();
  }

  private suscribirMenu(): void {
    this.menuService.isSidebarReduced$.subscribe(isReduced => {
      this.isSidebarReduced = isReduced;
    });
  }

  cargarLineas(): void {
    this.lineaService.getLineas().subscribe(
      (data) => {
        this.lineas = data;
      },
      (error) => {
        console.error('Error al cargar las líneas:', error);
      }
    );
  }
  cargarModalidades(): void {
    this.modalidadService.getModalidad().subscribe({
      next: (data: Modalidad[]) => this.Modalidades = data,
      error: (error) => console.error('Error al cargar las modalidades:', error)
    });
  }

  recargarObjetivos(): void {
    this.objetivoService.getObjetivos().subscribe({
      next: (data: Objetivo[]) => this.objetivos = data,
      error: (error) => console.error('Error al cargar objetivos:', error)
    });
  }

  seleccionarObjetivo(objetivo: Objetivo, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.objetivosSeleccionados.includes(objetivo)) {
        this.objetivosSeleccionados.push(objetivo);
      }
    } else {
      this.objetivosSeleccionados = this.objetivosSeleccionados.filter(obj => obj !== objetivo);
    }
  }
  crearConvocatoria(form: NgForm): void {
    const fechaInicioFormateada = this.convocatoria.fechaInicio 
    ? new Date(this.convocatoria.fechaInicio).toISOString().split('T')[0] 
    : null;

  const fechaFinFormateada = this.convocatoria.fechaFin 
    ? new Date(this.convocatoria.fechaFin).toISOString().split('T')[0] 
    : null;

    const nuevaConvocatoria: Convocatoria = {
      titulo: this.convocatoria.titulo,
      resolucion: this.convocatoria.resolucion,
      numeroResolucion: this.convocatoria.numeroResolucion,
      descripcion: this.convocatoria.descripcion,
      fechaInicio: fechaInicioFormateada,
      fechaFin: fechaFinFormateada,
      duracion: this.convocatoria.duracion,
      modalidadId: this.selectedModalidad ? parseInt(this.selectedModalidad) : null,
      objetivos: this.objetivosSeleccionados.map(obj => obj.idObjetivo),
      lineas: this.selectedOptions.map(opt => parseInt(opt.idLinea))
    };
  
    console.log('🎯 Enviando convocatoria:', nuevaConvocatoria);
  
    this.convocatoriaService.crearConvocatoria(nuevaConvocatoria).subscribe({
      next: (res) => {
        alert('✅ Convocatoria creada con éxito');
        form.resetForm();
        this.resetearFormulario();
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al crear convocatoria:', err);
        alert('Error al crear convocatoria');
      },
    });
  }
  
  resetearFormulario(): void {
    this.convocatoria = {
      titulo: '',
      resolucion: '',
      numeroResolucion: '',
      descripcion: '',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      duracion: 0,
      modalidadId: 0,
      objetivos: [],
      lineas: [],
    };
  
    this.selectedOption = null;
    this.selectedOptions = [];
    this.selectedModalidad = '';
    this.objetivosSeleccionados = [];
  
    this.cdRef.detectChanges();
  }
  
  crearObjetivo(): void {
    if (this.nuevoObjetivoForm.valid) {
      this.objetivoService.crearObjetivo(this.nuevoObjetivoForm.value).subscribe({
        next: () => {
          this.recargarObjetivos();
          this.nuevoObjetivoForm.reset();
          this.cerrarModal('CrearObjetivos');
        },
        error: (error) => console.error('Error al crear el objetivo', error)
      });
    }
  }

  habilitarEdicion(objetivo: Objetivo): void {
    this.objetivoEditado = {...objetivo};
    objetivo.editando = true;
  }

  guardarEdicion(objetivo: Objetivo): void {
    const objetivoActualizado = { ...objetivo };
    delete objetivoActualizado.editando;
    
    this.objetivoService.actualizarObjetivo(objetivoActualizado).subscribe({
      next: () => {
        objetivo.editando = false;
        this.objetivoEditado = null;
        this.recargarObjetivos();
      },
      error: (error) => {
        console.error('Error al actualizar el objetivo', error);
        this.revertirEdicion(objetivo);
      }
    });
  }

  private revertirEdicion(objetivo: Objetivo): void {
    if (this.objetivoEditado) {
      objetivo.nombre = this.objetivoEditado.nombre;
      objetivo.descripcion = this.objetivoEditado.descripcion;
    }
    objetivo.editando = false;
  }

  cancelarEdicion(objetivo: Objetivo): void {
    this.revertirEdicion(objetivo);
    this.objetivoEditado = null;
  }

  eliminarObjetivo(objetivo: Objetivo): void {
    if (confirm('¿Está seguro de que desea eliminar este objetivo?')) {
      this.objetivoService.eliminarObjetivo(objetivo.idObjetivo).subscribe({
        next: () => {
          this.objetivos = this.objetivos.filter(obj => obj.idObjetivo !== objetivo.idObjetivo);
          this.objetivosSeleccionados = this.objetivosSeleccionados.filter(obj => obj.idObjetivo !== objetivo.idObjetivo);
        },
        error: (error) => console.error('Error al eliminar el objetivo', error)
      });
    }
  }

  crearLinea(): void {
    if (this.nuevaLineaForm.valid) {
      this.lineaService.crearLinea(this.nuevaLineaForm.value).subscribe({
        next: () => {
          this.cargarLineas();
          this.nuevaLineaForm.reset();
          this.cerrarModal('modalCrearLinea');
        },
        error: (error) => console.error('Error al crear línea:', error)
      });
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      new bootstrap.Modal(modalElement, { keyboard: false }).show();
    }
  }

  private cerrarModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
  updateBox() {
    if (!this.selectedOption) {
      console.log("➡️ Sin línea seleccionada");
      return;
    }
    const nuevaOpcion = {
        idLinea: String((this.selectedOption as any).idLinea_Profundizacion || this.selectedOption.idLinea),
        nombre: this.selectedOption.nombre
    };
    const existe = this.selectedOptions.some(opt => opt.idLinea === nuevaOpcion.idLinea);

    if (!existe) {
        this.selectedOptions.push(nuevaOpcion);
    } else {
        console.warn("⚠️ La opción ya existe en la lista.");
    }
    this.selectedOption = null;
}

calcularDuracion() {
  if (this.convocatoria.fechaInicio && this.convocatoria.fechaFin) {
    const fechaInicio = new Date(this.convocatoria.fechaInicio);
    const fechaFin = new Date(this.convocatoria.fechaFin);

    if (fechaFin >= fechaInicio) {
      const diferenciaDias = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
      this.convocatoria.duracion = Math.round(diferenciaDias); 
    } else {
      this.convocatoria.duracion = 0;
    }
  }
}

  removeOption(index: number): void {
    this.selectedOptions.splice(index, 1);
  }

  Salir(): void {
    this.router.navigate(['/principal']);
  }

  guardarSeleccion(): void {
    this.objetivosGuardados = [...this.objetivosSeleccionados];
  }

  getLineaNombre(idLinea: string): string {
    const linea = this.lineas.find(l => l.idLinea === idLinea);
    return linea ? linea.nombre : idLinea;
  }

  getModalidadNombre(idModalidad: string): string {
    const modalidad = this.Modalidades.find(m => m.idModalidad === idModalidad);
    return modalidad ? modalidad.nombre : idModalidad;
  }
}
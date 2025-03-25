import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Linea } from 'src/app/model/Linea.model';
import { Modalidad } from 'src/app/model/Modalidad.model';
import { Objetivo } from 'src/app/model/Objetivo.model';
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
  selectedOption: string = '';
  selectedOptions: string[] = [];
  selectedModalidad: string = '';
  fechaInicio: string = new Date().toISOString().split('T')[0];
  fechaFin: string = new Date().toISOString().split('T')[0];
  objetivos: Objetivo[] = []; 
  objetivosSeleccionados: Objetivo[] = []; 
  objetivosGuardados: Objetivo[] = [];
  nuevoObjetivoForm: FormGroup;
  objetivoEditado: Objetivo | null = null;
  nuevaLineaForm: FormGroup;
  lineas: Linea[] = [];
  Modalidades: Modalidad[] = [];

  constructor(
    private menuService: MenuService, 
    private fb: FormBuilder,
    private objetivoService: ObjetivoService,
    private lineaService: LineaService,
    private modalidadService: ModalidadService,
    private router: Router

  ) {
    this.nuevoObjetivoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.nuevaLineaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    const hoy = new Date().toISOString().split('T')[0]; 
    this.fechaInicio = hoy;
    this.fechaFin = hoy;
  }
  

  ngOnInit() {
    this.cargarLineas();
    this.cargarModalidades();
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
    this.objetivoService.getObjetivos().subscribe(data => {
      this.objetivos = data;
    });
    this.nuevaLineaForm = this.fb.group({
      nombre: ['', Validators.required] 
    });
  }
  cargarLineas() {
    this.lineaService.getLineas().subscribe(
      (data) => {
        this.lineas = data; 
      },
      (error) => {
        console.error('Error al cargar las líneas:', error);
      }
    );
  }
  cargarModalidades() {
    this.modalidadService.getModalidad().subscribe(
      (data) => {
        console.log('Respuesta de la API:', data);
        this.Modalidades = data; 
      },
      (error) => {
        console.error('Error al cargar las modalidades:', error);
      }
    );
  }

  seleccionarObjetivo(objetivo: any, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.objetivosSeleccionados.includes(objetivo)) {
        this.objetivosSeleccionados.push(objetivo);
      }
    } else {
      this.objetivosSeleccionados = this.objetivosSeleccionados.filter(obj => obj !== objetivo);
    }
  }
  
  async crearObjetivo() {
    if (this.nuevoObjetivoForm.valid) {
      const objetivo = this.nuevoObjetivoForm.value;
      this.objetivoService.crearObjetivo(objetivo).subscribe(
        response => {
          this.recargarObjetivos();
          this.nuevoObjetivoForm.reset();
        this.nuevoObjetivoForm.markAsPristine();
        this.nuevoObjetivoForm.markAsUntouched();
        },
        error => {
          console.error('Error al crear el objetivo', error);
        }
      );
    }
  }
  async recargarObjetivos() {
    this.objetivoService.getObjetivos().subscribe(data => {
      this.objetivos = data;
    });
  }
  habilitarEdicion(objetivo: Objetivo) {
    this.objetivoEditado = {...objetivo};
    objetivo.editando = true;
  }
 async guardarEdicion(objetivo: Objetivo) {
    const objetivoActualizado = { ...objetivo };
    delete objetivoActualizado.editando;
    
    this.objetivoService.actualizarObjetivo(objetivoActualizado).subscribe(
      response => {
        objetivo.editando = false;
        this.objetivoEditado = null;
        
        this.recargarObjetivos();
      },
      error => {
        console.error('Error al actualizar el objetivo', error);
        if (this.objetivoEditado) {
          objetivo.nombre = this.objetivoEditado.nombre;
          objetivo.descripcion = this.objetivoEditado.descripcion;
          objetivo.editando = false;
        }
      }
    );
  }

  cancelarEdicion(objetivo: Objetivo) {
    if (this.objetivoEditado) {
      objetivo.nombre = this.objetivoEditado.nombre;
      objetivo.descripcion = this.objetivoEditado.descripcion;
    }
    objetivo.editando = false;
    this.objetivoEditado = null;
  }

 async eliminarObjetivo(objetivo: Objetivo) {
    if (confirm('¿Está seguro de que desea eliminar este objetivo?')) {
      this.objetivoService.eliminarObjetivo(objetivo.idObjetivo).subscribe(
        () => {
          this.objetivos = this.objetivos.filter(obj => obj.idObjetivo !== objetivo.idObjetivo);
          this.objetivosSeleccionados = this.objetivosSeleccionados.filter(obj => obj.idObjetivo !== objetivo.idObjetivo);
        },
        error => {
          console.error('Error al eliminar el objetivo', error);
        }
      );
    }
  }
 async crearLinea() {
    if (this.nuevaLineaForm.valid) {
      const linea = this.nuevaLineaForm.value;
      
      this.lineaService.crearLinea(linea).subscribe({
        next: (response) => {
          this.cargarLineas();
          this.nuevaLineaForm.reset();
        },
        error: (error) => {
          console.error("Error al crear línea:", error);
        }
      });
    }
  }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  openModal() {
    const modalElement = document.getElementById('modalCrearLinea');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: false 
      });
      modal.show();
    } 
  }
  openModalVolver(){
    const modalElement = document.getElementById('modalConfirmarSalida');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: false 
      });
      modal.show();
    }
  }
  openModalGuardar(){
    const modalElement = document.getElementById('modalConfirmarGuardado');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: false 
      });
      modal.show();
    }
  }
  openModalObject(){
    const modalElement = document.getElementById('CrearObjetivos');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: false 
      });
      modal.show();
    }
  }
  updateBox() {
    if (this.selectedOption && !this.selectedOptions.includes(this.selectedOption)) {
      this.selectedOptions.push(this.selectedOption);
    }
    this.selectedOption = ""; 
  }

  removeOption(index: number) {
    this.selectedOptions.splice(index, 1);
  }

  Salir() {
    this.router.navigate(['/principal']);
  }

    guardarSeleccion() {
    this.objetivosGuardados = [...this.objetivosSeleccionados];
  }
 
}


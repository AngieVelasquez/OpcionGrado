import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { Router } from '@angular/router'; 
import { ConvocatoriaService } from 'src/app/service/Convocatoria.service';
import { Convocatoria } from 'src/app/model/Convocatoria.model';
declare var bootstrap: any;

@Component({
  selector: 'app-ver-convocatoria',
  templateUrl: './ver-convocatoria.component.html',
  styleUrls: ['./ver-convocatoria.component.css']
})
export class VerConvocatoriaComponent implements OnInit {
  isSidebarReduced: boolean = false;
  isModalOpen: boolean = false;
  convocatoria?: Convocatoria;


  constructor(private menuService: MenuService, private router: Router,
        private convocatoriaService: ConvocatoriaService
    
  ) {} 

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
    this.convocatoria = this.convocatoriaService.convocatoriaSeleccionada;
  }

  openModalVolver() {
    const modalElement = document.getElementById('modalConfirmarSalida');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    setTimeout(() => {
      document.body.classList.remove('modal-open');

      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

      this.router.navigate(['/principal']).then(() => {
        console.log('Navegación exitosa');
      }).catch(err => {
        console.error('Error en la navegación:', err);
      });

    }, 300);
  }
  formatearFecha(fecha: string | Date | null | undefined): string {
    if (!fecha) return 'Sin fecha';
  
    const fechaDate = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaDate.toLocaleDateString('es-CO');
  }
  
  calcularDiasRestantes(fechaFin: Date | string | null): number {
    if (!fechaFin) return 0;
  
    const hoy = new Date();
    const fin = new Date(fechaFin); 
  
    const diferenciaMs = fin.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  
    return diasRestantes > 0 ? diasRestantes : 0;
  }
  
  
  Salir() {
    window.location.href = '/principal';
  }
}

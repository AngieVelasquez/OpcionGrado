import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/services/menu.service';
import { Router } from '@angular/router'; // ✅ Importa el Router
declare var bootstrap: any;

@Component({
  selector: 'app-ver-convocatoria',
  templateUrl: './ver-convocatoria.component.html',
  styleUrls: ['./ver-convocatoria.component.css']
})
export class VerConvocatoriaComponent implements OnInit {
  isSidebarReduced: boolean = false;
  isModalOpen: boolean = false;

  constructor(private menuService: MenuService, private router: Router) {} // ✅ Agrega el Router al constructor

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }

  openModalVolver() {
    const modalElement = document.getElementById('modalConfirmarSalida');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    // Esperar a que Bootstrap oculte el modal antes de limpiar el fondo y navegar
    setTimeout(() => {
      document.body.classList.remove('modal-open');

      // Seleccionar y eliminar todos los backdrops
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

      // ✅ Redirigir correctamente
      this.router.navigate(['/principal']).then(() => {
        console.log('Navegación exitosa');
      }).catch(err => {
        console.error('Error en la navegación:', err);
      });

    }, 300);
  }

  Salir() {
    window.location.href = '/principal';
  }
}

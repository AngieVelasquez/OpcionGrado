import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
declare var bootstrap: any;

@Component({
  selector: 'app-inscripcion-grupo',
  templateUrl: './inscripcion-grupo.component.html',
  styleUrls: ['./inscripcion-grupo.component.css']
})
export class InscripcionGrupoComponent implements OnInit{
 isSidebarReduced: boolean = false;
 isModalOpen: boolean = false;

  constructor(private menuService: MenuService) {}
  
  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
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

  guardarCambios(){
    
  }
 
  Salir() {
    window.location.href = '/principal';
  }
  selectedOption: string = "";
  selectedOptions: string[] = [];

  updateBox() {
    if (this.selectedOption && !this.selectedOptions.includes(this.selectedOption)) {
      this.selectedOptions.push(this.selectedOption);
    }
    this.selectedOption = ""; 
  }

  removeOption(index: number) {
    this.selectedOptions.splice(index, 1);
  }

  
}
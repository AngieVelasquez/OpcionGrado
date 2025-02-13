import { Component,OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/services/menu.service';

@Component({
  selector: 'app-gestionar-proyecto',
  templateUrl: './gestionar-proyecto.component.html',
  styleUrls: ['./gestionar-proyecto.component.css']
})
export class GestionarProyectoComponent implements OnInit{
 isSidebarReduced: boolean = false;
 isModalOpen: boolean = false;

  constructor(private menuService: MenuService) {}
  
  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }
  Salir() {
    window.location.href = '/principal';
  }
}

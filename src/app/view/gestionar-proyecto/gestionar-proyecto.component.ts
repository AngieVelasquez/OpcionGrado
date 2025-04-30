import { Component,OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-gestionar-proyecto',
  templateUrl: './gestionar-proyecto.component.html',
  styleUrls: ['./gestionar-proyecto.component.css']
})
export class GestionarProyectoComponent implements OnInit{
 isSidebarReduced: boolean = false;
 isModalOpen: boolean = false;
  router: any;
  contadorObjetivos = 1;
  nuevoObjetivo = '';
  listaObjetivos: { id: number; texto: string }[] = [];
  isCollapsed: boolean[] = [false, false, false, false];


  actividades = [
    {
      nombre: 'Actividad 1',
      semanas: new Array(16).fill(false) // 4 periodos × 4 semanas = 16
    }
  ];

  constructor(private menuService: MenuService) {}
  
  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
    
  }

    agregarObjetivo(): void {
      const input = document.getElementById("objetivoEspecifico") as HTMLInputElement;
      const lista = document.getElementById("listaObjetivos");
  
      if (input && lista && input.value.trim() !== "") {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center";
  
        li.innerHTML = `
          <span class="numero me-2">${this.contadorObjetivos}.</span>  
          <span class="objetivo-texto flex-grow-1">${input.value}</span>  
          <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
        `;
  
        const botonEliminar = li.querySelector(".eliminar-btn") as HTMLButtonElement;
        botonEliminar.addEventListener("click", () => this.eliminarObjetivo(li));
  
        lista.appendChild(li);
  
        this.contadorObjetivos++;
        input.value = "";
      }
    }
  
    eliminarObjetivo(elemento: HTMLElement): void {
      elemento.remove();
      this.reenumerarObjetivos();
    }
  
    reenumerarObjetivos(): void {
      const lista = document.getElementById("listaObjetivos");
      if (!lista) return;
  
      const items = Array.from(lista.children) as HTMLElement[];
      this.contadorObjetivos = 1;
  
      for (const li of items) {
        const numero = li.querySelector(".numero");
        if (numero) {
          numero.textContent = `${this.contadorObjetivos}.`;
          this.contadorObjetivos++;
        }
      }
    }
  
    toggleAccordion(index: number): void {
      this.isCollapsed[index] = !this.isCollapsed[index];
    }
    
  Salir() {
    this.router.navigate(['/principal']);
  }
  agregarActividad() {
    this.actividades.push({
      nombre: `Actividad ${this.actividades.length + 1}`,
      semanas: new Array(16).fill(false)
    });
  }
  toggleSemanasHasta(actividad: any, index: number) {
    const activar = !actividad.semanas[index]; 
    for (let i = 0; i < actividad.semanas.length; i++) {
      actividad.semanas[i] = i <= index ? activar : false;
    }
  }
  
}

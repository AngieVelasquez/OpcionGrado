import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { LoginRequest } from 'src/app/model/Auth-response.model';
import { PersonaService } from 'src/app/service/Usuario.service';
import { Usuario } from 'src/app/model/Usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  isSidebarVisible: boolean = true;
  isMobile: boolean = false;
  isSidebarReduced: boolean = false; 
  currentYear: number = new Date().getFullYear();

  private readonly MOBILE_BREAKPOINT = 768; 
  router: any;
  nombreUsuario: string = '';

  constructor(private menuService: MenuService, private personaService: PersonaService) {} 
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.dropdownButton) {
        console.log(this.dropdownButton.nativeElement);
      }
    });
  }

  ngOnInit() {

    this.updateSidebarVisibility();
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
    if (window.innerWidth < 768) {
      this.isSidebarVisible = true;
      this.isMobile = true;
    }
    this.personaService.getUsuarios().subscribe((response) => {
      this.nombreUsuario = response.nombreCompleto;
      console.log(this.nombreUsuario); 
    }, (error) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }
  @HostListener('window:resize')
  onResize() {
    this.updateSidebarVisibility();
  }


  private updateSidebarVisibility() {
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    this.isSidebarVisible = !this.isMobile || this.isSidebarVisible;
  }
  /**
   * Alterna la visibilidad del menú lateral.
   * @param event (opcional) Evento del clic para detener propagación si es necesario.
   */
  toggleSidebar(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
  
    this.isSidebarVisible = !this.isSidebarVisible;
    this.menuService.toggleSidebar(); 
  }
  
  isConvocatoriasOpen = false;
  isProyectosOpen = false; 
  isGrupoOpen = false;

  toggleAccordion(accordion: string) {
    if (accordion === 'convocatorias') {
      this.isConvocatoriasOpen = !this.isConvocatoriasOpen;
      if (this.isConvocatoriasOpen) {
        this.isProyectosOpen = false;
        this.isGrupoOpen = false;
      }
    } else if (accordion === 'proyectos') {
      this.isProyectosOpen = !this.isProyectosOpen;
      if (this.isProyectosOpen) {
        this.isConvocatoriasOpen = false;
        this.isGrupoOpen = false;
      }
      }else if (accordion === 'grupos') {
        this.isGrupoOpen = !this.isGrupoOpen;
        if (this.isGrupoOpen) {
          this.isProyectosOpen = false;
          this.isConvocatoriasOpen = false;
        }
    }
  }

  reloadPage(): void {
    this.router.navigate(['/principal']).then(() => {
      window.location.reload();
    }).catch((err: unknown) => console.error('Error en la navegación:', err));
  }
  
  
}

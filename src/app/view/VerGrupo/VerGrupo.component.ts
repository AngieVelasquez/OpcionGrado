import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-VerGrupo',
  templateUrl: './VerGrupo.component.html',
  styleUrls: ['./VerGrupo.component.css']
})
export class VerGrupoComponent implements OnInit {
  isSidebarReduced: boolean = false;

  constructor(private menuService: MenuService,) { }

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }

}

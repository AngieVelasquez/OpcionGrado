import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  isSidebarReduced: boolean = false;
  isModalOpen: boolean = false;
  elements: any[] = [];
  showImageOptions: boolean = false;
  carouselImages: string[] = [];
  isSelectingForCarousel: boolean = false;

  @ViewChild('carouselFileInput') carouselFileInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isSidebarReduced$.subscribe((isReduced) => {
      this.isSidebarReduced = isReduced;
    });
  }

  addElement() {
    this.elements.push({ type: 'input', content: '' });
  }

  toggleImageOptions() {
    this.showImageOptions = !this.showImageOptions;
  }

  removeElement(index: number) {
    this.elements.splice(index, 1);
  }

}
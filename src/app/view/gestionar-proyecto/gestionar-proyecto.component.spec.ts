import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProyectoComponent } from './gestionar-proyecto.component';

describe('GestionarProyectoComponent', () => {
  let component: GestionarProyectoComponent;
  let fixture: ComponentFixture<GestionarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

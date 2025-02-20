import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesGruposComponent } from './inscripciones-grupos.component';

describe('InscripcionesGruposComponent', () => {
  let component: InscripcionesGruposComponent;
  let fixture: ComponentFixture<InscripcionesGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionesGruposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

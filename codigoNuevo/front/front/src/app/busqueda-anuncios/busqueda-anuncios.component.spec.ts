import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAnunciosComponent } from './busqueda-anuncios.component';

describe('BusquedaAnunciosComponent', () => {
  let component: BusquedaAnunciosComponent;
  let fixture: ComponentFixture<BusquedaAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaAnunciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

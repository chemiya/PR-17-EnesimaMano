import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnunciosComponent } from './lista-anuncios.component';

describe('ListaAnunciosComponent', () => {
  let component: ListaAnunciosComponent;
  let fixture: ComponentFixture<ListaAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnunciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

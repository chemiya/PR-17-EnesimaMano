import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosFavoritosComponent } from './anuncios-favoritos.component';

describe('AnunciosFavoritosComponent', () => {
  let component: AnunciosFavoritosComponent;
  let fixture: ComponentFixture<AnunciosFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunciosFavoritosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

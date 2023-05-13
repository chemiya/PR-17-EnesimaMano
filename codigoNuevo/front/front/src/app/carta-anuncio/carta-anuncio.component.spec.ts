import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaAnuncioComponent } from './carta-anuncio.component';

describe('CartaAnuncioComponent', () => {
  let component: CartaAnuncioComponent;
  let fixture: ComponentFixture<CartaAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaAnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

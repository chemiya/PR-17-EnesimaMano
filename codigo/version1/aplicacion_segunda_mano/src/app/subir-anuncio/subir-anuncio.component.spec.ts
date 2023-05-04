import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirAnuncioComponent } from './subir-anuncio.component';

describe('SubirAnuncioComponent', () => {
  let component: SubirAnuncioComponent;
  let fixture: ComponentFixture<SubirAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirAnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

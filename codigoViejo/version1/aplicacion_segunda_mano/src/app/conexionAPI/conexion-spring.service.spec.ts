import { TestBed } from '@angular/core/testing';

import { ConexionSpringService } from './conexion-spring.service';

describe('ConexionSpringService', () => {
  let service: ConexionSpringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionSpringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

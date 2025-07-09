import { TestBed } from '@angular/core/testing';

import { ControleTechniqueService } from './controle-technique.service';

describe('ControleTechniqueService', () => {
  let service: ControleTechniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleTechniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BanquierService } from './banquier.service';

describe('BanquierService', () => {
  let service: BanquierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanquierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

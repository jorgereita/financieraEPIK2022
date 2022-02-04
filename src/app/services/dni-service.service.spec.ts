import { TestBed } from '@angular/core/testing';

import { DniServiceService } from './dni-service.service';

describe('DniServiceService', () => {
  let service: DniServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DniServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FingerprintApiService } from './fingerprint-api.service';

describe('FingerprintApiService', () => {
  let service: FingerprintApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerprintApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

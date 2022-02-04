import { TestBed } from '@angular/core/testing';

import { FingerprintVideoServiceService } from './fingerprint-video-service.service';

describe('FingerprintVideoServiceService', () => {
  let service: FingerprintVideoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerprintVideoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

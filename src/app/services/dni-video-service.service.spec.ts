import { TestBed } from '@angular/core/testing';

import { DniVideoServiceService } from './dni-video-service.service';

describe('DniVideoServiceService', () => {
  let service: DniVideoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DniVideoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

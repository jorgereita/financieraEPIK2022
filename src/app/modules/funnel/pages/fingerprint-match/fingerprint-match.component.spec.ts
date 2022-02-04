import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintMatchComponent } from './fingerprint-match.component';

describe('FingerprintMatchComponent', () => {
  let component: FingerprintMatchComponent;
  let fixture: ComponentFixture<FingerprintMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FingerprintMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

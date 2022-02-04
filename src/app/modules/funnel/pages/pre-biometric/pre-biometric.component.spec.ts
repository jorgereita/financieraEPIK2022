import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBiometricComponent } from './pre-biometric.component';

describe('PreBiometricComponent', () => {
  let component: PreBiometricComponent;
  let fixture: ComponentFixture<PreBiometricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreBiometricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBiometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

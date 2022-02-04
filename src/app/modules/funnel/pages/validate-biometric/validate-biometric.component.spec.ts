import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateBiometricComponent } from './validate-biometric.component';

describe('ValidateBiometricComponent', () => {
  let component: ValidateBiometricComponent;
  let fixture: ComponentFixture<ValidateBiometricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateBiometricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateBiometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

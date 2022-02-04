import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricSuccessComponent } from './biometric-success.component';

describe('BiometricSuccessComponent', () => {
  let component: BiometricSuccessComponent;
  let fixture: ComponentFixture<BiometricSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

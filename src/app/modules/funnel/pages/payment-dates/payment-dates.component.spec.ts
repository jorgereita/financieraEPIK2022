import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDatesComponent } from './payment-dates.component';

describe('PaymentDatesComponent', () => {
  let component: PaymentDatesComponent;
  let fixture: ComponentFixture<PaymentDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectpaymentComponent } from './rejectpayment.component';

describe('RejectpaymentComponent', () => {
  let component: RejectpaymentComponent;
  let fixture: ComponentFixture<RejectpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

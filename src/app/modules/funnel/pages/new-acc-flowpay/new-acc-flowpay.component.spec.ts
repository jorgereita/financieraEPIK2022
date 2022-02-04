import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccFlowpayComponent } from './new-acc-flowpay.component';

describe('NewAccFlowpayComponent', () => {
  let component: NewAccFlowpayComponent;
  let fixture: ComponentFixture<NewAccFlowpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccFlowpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccFlowpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpaymentComponent } from './detailpayment.component';

describe('DetailpaymentComponent', () => {
  let component: DetailpaymentComponent;
  let fixture: ComponentFixture<DetailpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

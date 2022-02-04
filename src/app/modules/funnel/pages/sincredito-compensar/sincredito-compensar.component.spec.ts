import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SincreditoCompensarComponent } from './sincredito-compensar.component';

describe('SincreditoCompensarComponent', () => {
  let component: SincreditoCompensarComponent;
  let fixture: ComponentFixture<SincreditoCompensarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SincreditoCompensarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SincreditoCompensarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

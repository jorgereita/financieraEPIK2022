import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAmountSuccessComponent } from './choose-amount-success.component';

describe('ChooseAmountSuccessComponent', () => {
  let component: ChooseAmountSuccessComponent;
  let fixture: ComponentFixture<ChooseAmountSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAmountSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAmountSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

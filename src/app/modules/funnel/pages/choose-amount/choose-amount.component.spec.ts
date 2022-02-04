import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAmountComponent } from './choose-amount.component';

describe('ChooseAmountComponent', () => {
  let component: ChooseAmountComponent;
  let fixture: ComponentFixture<ChooseAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

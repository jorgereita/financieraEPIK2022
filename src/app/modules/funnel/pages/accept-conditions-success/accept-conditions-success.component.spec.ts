import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptConditionsSuccessComponent } from './accept-conditions-success.component';

describe('AcceptConditionsSuccessComponent', () => {
  let component: AcceptConditionsSuccessComponent;
  let fixture: ComponentFixture<AcceptConditionsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptConditionsSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptConditionsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

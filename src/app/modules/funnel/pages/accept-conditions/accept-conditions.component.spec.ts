import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptConditionsComponent } from './accept-conditions.component';

describe('AcceptConditionsComponent', () => {
  let component: AcceptConditionsComponent;
  let fixture: ComponentFixture<AcceptConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishFlowComponent } from './finish-flow.component';

describe('FinishFlowComponent', () => {
  let component: FinishFlowComponent;
  let fixture: ComponentFixture<FinishFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

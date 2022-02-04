import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccFlowdebtComponent } from './new-acc-flowdebt.component';

describe('NewAccFlowdebtComponent', () => {
  let component: NewAccFlowdebtComponent;
  let fixture: ComponentFixture<NewAccFlowdebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccFlowdebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccFlowdebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

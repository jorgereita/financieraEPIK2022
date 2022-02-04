import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniValidationSuccessfullComponent } from './dni-validation-successfull.component';

describe('DniValidationSuccessfullComponent', () => {
  let component: DniValidationSuccessfullComponent;
  let fixture: ComponentFixture<DniValidationSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DniValidationSuccessfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DniValidationSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

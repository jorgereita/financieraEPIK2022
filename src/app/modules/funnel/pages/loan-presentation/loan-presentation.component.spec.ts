import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPresentationComponent } from './loan-presentation.component';

describe('LoanPresentationComponent', () => {
  let component: LoanPresentationComponent;
  let fixture: ComponentFixture<LoanPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

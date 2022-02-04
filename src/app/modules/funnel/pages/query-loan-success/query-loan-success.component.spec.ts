import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryLoanSuccessComponent } from './query-loan-success.component';

describe('QueryLoanSuccessComponent', () => {
  let component: QueryLoanSuccessComponent;
  let fixture: ComponentFixture<QueryLoanSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryLoanSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryLoanSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

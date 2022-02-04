import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedAccountsComponent } from './discounted-accounts.component';

describe('DiscountedAccountsComponent', () => {
  let component: DiscountedAccountsComponent;
  let fixture: ComponentFixture<DiscountedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountedAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

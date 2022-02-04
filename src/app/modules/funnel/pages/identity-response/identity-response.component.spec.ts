import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResponseComponent } from './identity-response.component';

describe('IdentityResponseComponent', () => {
  let component: IdentityResponseComponent;
  let fixture: ComponentFixture<IdentityResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

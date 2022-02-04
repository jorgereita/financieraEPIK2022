import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDataComponent } from './auth-data.component';

describe('AuthDataComponent', () => {
  let component: AuthDataComponent;
  let fixture: ComponentFixture<AuthDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

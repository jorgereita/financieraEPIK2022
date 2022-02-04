import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoadDataComponent } from './auth-load-data.component';

describe('AuthLoadDataComponent', () => {
  let component: AuthLoadDataComponent;
  let fixture: ComponentFixture<AuthLoadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoadDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

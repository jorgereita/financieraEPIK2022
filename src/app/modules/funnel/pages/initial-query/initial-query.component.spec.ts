import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialQueryComponent } from './initial-query.component';

describe('InitialQueryComponent', () => {
  let component: InitialQueryComponent;
  let fixture: ComponentFixture<InitialQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckfaceComponent } from './checkface.component';

describe('CheckfaceComponent', () => {
  let component: CheckfaceComponent;
  let fixture: ComponentFixture<CheckfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

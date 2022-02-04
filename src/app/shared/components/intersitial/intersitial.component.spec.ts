import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersitialComponent } from './intersitial.component';

describe('IntersitialComponent', () => {
  let component: IntersitialComponent;
  let fixture: ComponentFixture<IntersitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntersitialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

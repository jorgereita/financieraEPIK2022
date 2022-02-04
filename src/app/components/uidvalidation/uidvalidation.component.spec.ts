import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UidvalidationComponent } from './uidvalidation.component';

describe('UidvalidationComponent', () => {
  let component: UidvalidationComponent;
  let fixture: ComponentFixture<UidvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UidvalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UidvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

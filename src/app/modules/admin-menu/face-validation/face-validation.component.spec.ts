import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceValidationComponent } from './face-validation.component';

describe('FaceValidationComponent', () => {
  let component: FaceValidationComponent;
  let fixture: ComponentFixture<FaceValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniDetectorPresentationComponent } from './dni-detector-presentation.component';

describe('DniDetectorPresentationComponent', () => {
  let component: DniDetectorPresentationComponent;
  let fixture: ComponentFixture<DniDetectorPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DniDetectorPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DniDetectorPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

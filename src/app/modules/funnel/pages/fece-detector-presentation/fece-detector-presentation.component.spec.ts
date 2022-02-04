import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeceDetectorPresentationComponent } from './fece-detector-presentation.component';

describe('FeceDetectorPresentationComponent', () => {
  let component: FeceDetectorPresentationComponent;
  let fixture: ComponentFixture<FeceDetectorPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeceDetectorPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeceDetectorPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCheckComponent } from './overlay-check.component';

describe('OverlayCheckComponent', () => {
  let component: OverlayCheckComponent;
  let fixture: ComponentFixture<OverlayCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

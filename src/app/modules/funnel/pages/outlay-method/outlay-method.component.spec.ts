import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlayMethodComponent } from './outlay-method.component';

describe('OutlayMethodComponent', () => {
  let component: OutlayMethodComponent;
  let fixture: ComponentFixture<OutlayMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlayMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlayMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

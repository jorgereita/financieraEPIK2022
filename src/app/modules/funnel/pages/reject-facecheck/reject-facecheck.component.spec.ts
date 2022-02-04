import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectFacecheckComponent } from './reject-facecheck.component';

describe('RejectFacecheckComponent', () => {
  let component: RejectFacecheckComponent;
  let fixture: ComponentFixture<RejectFacecheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectFacecheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectFacecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

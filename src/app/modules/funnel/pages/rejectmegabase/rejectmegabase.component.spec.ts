import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectmegabaseComponent } from './rejectmegabase.component';

describe('RejectmegabaseComponent', () => {
  let component: RejectmegabaseComponent;
  let fixture: ComponentFixture<RejectmegabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectmegabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectmegabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

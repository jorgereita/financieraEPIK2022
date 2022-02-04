import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFgaComponent } from './report-fga.component';

describe('ReportFgaComponent', () => {
  let component: ReportFgaComponent;
  let fixture: ComponentFixture<ReportFgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

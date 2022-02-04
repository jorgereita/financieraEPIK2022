import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMatchDocComponent } from './no-match-doc.component';

describe('NoMatchDocComponent', () => {
  let component: NoMatchDocComponent;
  let fixture: ComponentFixture<NoMatchDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoMatchDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMatchDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlimpiaComponent } from './olimpia.component';

describe('OlimpiaComponent', () => {
  let component: OlimpiaComponent;
  let fixture: ComponentFixture<OlimpiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlimpiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlimpiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

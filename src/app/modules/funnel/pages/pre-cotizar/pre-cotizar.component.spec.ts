import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCotizarComponent } from './pre-cotizar.component';

describe('PreCotizarComponent', () => {
  let component: PreCotizarComponent;
  let fixture: ComponentFixture<PreCotizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreCotizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

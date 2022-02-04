import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SincupoparacomprarComponent } from './sincupoparacomprar.component';

describe('SincupoparacomprarComponent', () => {
  let component: SincupoparacomprarComponent;
  let fixture: ComponentFixture<SincupoparacomprarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SincupoparacomprarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SincupoparacomprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

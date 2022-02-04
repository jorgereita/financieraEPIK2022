import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniPlayerComponent } from './dni-player.component';

describe('DniPlayerComponent', () => {
  let component: DniPlayerComponent;
  let fixture: ComponentFixture<DniPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DniPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DniPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

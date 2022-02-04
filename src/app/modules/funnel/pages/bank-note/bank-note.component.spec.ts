import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankNoteComponent } from './bank-note.component';

describe('BankNoteComponent', () => {
  let component: BankNoteComponent;
  let fixture: ComponentFixture<BankNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

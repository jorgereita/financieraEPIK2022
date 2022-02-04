import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnChatComponent } from './btn-chat.component';

describe('BtnChatComponent', () => {
  let component: BtnChatComponent;
  let fixture: ComponentFixture<BtnChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

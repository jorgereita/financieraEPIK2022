import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAgentComponent } from './init-agent.component';

describe('InitAgentComponent', () => {
  let component: InitAgentComponent;
  let fixture: ComponentFixture<InitAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

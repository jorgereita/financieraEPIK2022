import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintVideoPlayerComponent } from './fingerprint-video-player.component';

describe('FingerprintVideoPlayerComponent', () => {
  let component: FingerprintVideoPlayerComponent;
  let fixture: ComponentFixture<FingerprintVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FingerprintVideoPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

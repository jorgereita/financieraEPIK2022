import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FingerprintRoutingModule } from './fingerprint-routing.module';
import { FingerprintMatchComponent } from './fingerprint-match/fingerprint-match.component';
import { FingerprintVideoPlayerComponent } from './fingerprint-video-player/fingerprint-video-player.component';
import { MatchComponent } from './match/match.component';
import {FingerprintDetectorModule} from 'fingerprint-detector';


@NgModule({
  declarations: [FingerprintMatchComponent, FingerprintVideoPlayerComponent, MatchComponent],
  imports: [
    CommonModule,
    FingerprintRoutingModule,
    FingerprintDetectorModule
  ]
})
export class FingerprintModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { OverlayCheckComponent } from './components/overlay-check/overlay-check.component';
import { IntersitialComponent } from './components/intersitial/intersitial.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { FingerprintVideoPlayerComponent } from './components/fingerprint-video-player/fingerprint-video-player.component';
import { NewAccountFormComponent } from './components/new-account-form/new-account-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { DniPlayerComponent } from './components/dni-player/dni-player.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
 

@NgModule({
  declarations: [ModalInfoComponent,TopbarComponent, OverlayCheckComponent, IntersitialComponent, VideoPlayerComponent, FingerprintVideoPlayerComponent, NewAccountFormComponent, DniPlayerComponent ],
  exports: [
    TopbarComponent,
    OverlayCheckComponent,
    IntersitialComponent,
    VideoPlayerComponent,
    FingerprintVideoPlayerComponent,
    NewAccountFormComponent,
    DniPlayerComponent,
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule
  ],
  entryComponents: [ModalInfoComponent],
})
export class SharedModule { }

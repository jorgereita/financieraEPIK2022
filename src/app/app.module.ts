import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartComponent } from './components/start/pages/start/start.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SignModule} from './modules/sign/sign.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FunnelModule } from './modules/funnel/funnel.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { NgOtpInputModule } from 'ng-otp-input';
import {WebcamModule} from 'ngx-webcam';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {InterceptInterceptor} from './intercept.interceptor';
import { ModalInfoComponent } from './shared/components/modal-info/modal-info.component';
import { AdminMenuModule } from './modules/admin-menu/admin-menu.module';
import { UidvalidationComponent } from './components/uidvalidation/uidvalidation.component';
import { APP_BASE_HREF } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
 
 

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

declare global {
  interface Window {
    handpose: any; Hands: any; Camera: any; drawConnectors: any; HAND_CONNECTIONS: any; drawLandmark: any;
    drawLandmarks: any; lerp: any; ImageCapture: any;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    UidvalidationComponent,
 
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:5000'
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    SignModule,
    AdminMenuModule,
    MatToolbarModule,
    MatButtonModule,
    FunnelModule,
    MatCarouselModule.forRoot(),
    NgOtpInputModule,
    WebcamModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    MatCheckboxModule,
    AngularFireStorageModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptInterceptor,
      multi: true
    },
    // { provide: APP_BASE_HREF, useValue : '/Euro/' }
  ],
 
  exports: [
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollComponent, PopUpImgComponent } from './enroll/enroll.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { AngularOtpLibModule } from 'angular-otp-box';
import { DniDetectorModule } from 'dni-detector';
import { FingerprintDetectorModule } from 'fingerprint-detector';
import { FaceDetectorModule } from 'ml-face-detector';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxMaskModule } from 'ngx-mask';
import { WebcamModule } from 'ngx-webcam';
import { SharedModule } from 'src/app/shared/shared.module';
import { FunnelRoutingModule } from '../funnel/funnel-routing.module';
import { FaceMatchComponent } from './face-match/face-match.component';
import { FaceValidationComponent } from './face-validation/face-validation.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { FunnelModule } from '../funnel/funnel.module';
import { PopUpConfirmReportComponent, ReportFgaComponent } from './report-fga/report-fga.component';
 



@NgModule({
  declarations: [EnrollComponent, MenuComponent, FaceMatchComponent, FaceValidationComponent, PopUpImgComponent, ReportFgaComponent,PopUpConfirmReportComponent],
  entryComponents: [PopUpImgComponent,PopUpConfirmReportComponent],
  imports: [
    FunnelModule,
    CommonModule,
    FunnelRoutingModule,
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCarouselModule,
    AngularOtpLibModule,
    NgOtpInputModule,
    MatCheckboxModule,
    WebcamModule,
    NgxMaskModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    FingerprintDetectorModule,
    MatButtonModule,
    FaceDetectorModule,
    DniDetectorModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatMenuModule
  ]
})
export class AdminMenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunnelRoutingModule } from './funnel-routing.module';
import { LoanPresentationComponent } from './pages/loan-presentation/loan-presentation.component';
import {SharedModule} from '../../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { LoanFormComponent } from './pages/loan-form/loan-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import { EmailConfirmComponent } from './pages/email-confirm/email-confirm.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';
import { OtpComponent } from './pages/otp/otp.component';
import {AngularOtpLibModule} from 'angular-otp-box';
import {NgOtpInputModule} from 'ng-otp-input';
import { ChooseAmountComponent } from './pages/choose-amount/choose-amount.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BiometricComponent } from './pages/biometric/biometric.component';
import {WebcamModule} from 'ngx-webcam';
import { StatusComponent } from './pages/status/status.component';
import { ValidateBiometricComponent } from './pages/validate-biometric/validate-biometric.component';
import {NgxMaskModule} from 'ngx-mask';
import { BirthComponent } from './pages/birth/birth.component';
import { OccupationComponent } from './pages/occupation/occupation.component';
import {MatIconModule} from '@angular/material/icon';
import { PreBiometricComponent } from './pages/pre-biometric/pre-biometric.component';
import { BiometricSuccessComponent } from './pages/biometric-success/biometric-success.component';
import { OtpSuccessComponent } from './pages/otp-success/otp-success.component';
import { AddAccountsComponent } from './pages/add-accounts/add-accounts.component';
import { DiscountedAccountsComponent } from './pages/discounted-accounts/discounted-accounts.component';
import { AcceptConditionsComponent } from './pages/accept-conditions/accept-conditions.component';
import { AcceptConditionsSuccessComponent } from './pages/accept-conditions-success/accept-conditions-success.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { FinishComponent } from './pages/finish/finish.component';
import { FaceComponent } from './pages/face/face.component';
import { IdentityResponseComponent } from './pages/identity-response/identity-response.component';
import { FingerprintMatchComponent } from './pages/fingerprint-match/fingerprint-match.component';
import { NewBankAccountComponent } from './pages/new-bank-account/new-bank-account.component';
import { DniComponent } from './pages/dni/dni.component';
import {FingerprintDetectorModule} from 'fingerprint-detector';
import { InitialQueryComponent } from './pages/initial-query/initial-query.component';
import { InitAgentComponent } from './pages/init-agent/init-agent.component';
import { AuthDataComponent } from './pages/auth-data/auth-data.component';
import { AuthLoadDataComponent } from './pages/auth-load-data/auth-load-data.component';
import { OlimpiaComponent } from './pages/olimpia/olimpia.component';
import { QueryLoanSuccessComponent } from './pages/query-loan-success/query-loan-success.component';
import { FinishFlowComponent } from './pages/finish-flow/finish-flow.component';
import {MatButtonModule} from '@angular/material/button';
import { AdditionalDataComponent } from './pages/additional-data/additional-data.component';
import { BankNoteComponent } from './pages/bank-note/bank-note.component';
import { PreApprovedComponent } from './pages/pre-approved/pre-approved.component';
import { ChooseAmountSuccessComponent } from './pages/choose-amount-success/choose-amount-success.component';
import { DniDetectorComponent } from './pages/dni-detector/dni-detector.component';
import { FaceDetectorComponent } from './pages/face-detector/face-detector.component';
import { FingerprintDetectorComponent } from './pages/fingerprint-detector/fingerprint-detector.component';
import {FaceDetectorModule} from 'ml-face-detector';
import {DniDetectorModule} from 'dni-detector';
import {MatRadioModule} from '@angular/material/radio';
import { FeceDetectorPresentationComponent } from './pages/fece-detector-presentation/fece-detector-presentation.component';
import { DniDetectorPresentationComponent } from './pages/dni-detector-presentation/dni-detector-presentation.component';
import { DniValidationSuccessfullComponent } from './pages/dni-validation-successfull/dni-validation-successfull.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { RejectpaymentComponent } from './pages/rejectpayment/rejectpayment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RejectmegabaseComponent } from './pages/rejectmegabase/rejectmegabase.component';
import { CheckfaceComponent } from './pages/checkface/checkface.component';
import { RejectFacecheckComponent } from './pages/reject-facecheck/reject-facecheck.component';
import { MatMenuModule } from '@angular/material/menu';
import { OutlayComponent,OutlayNewComponent } from './pages/outlay/outlay.component';
import { PreCotizarComponent } from './pages/pre-cotizar/pre-cotizar.component';
import { DniConfirmComponent } from './pages/dni-confirm/dni-confirm.component';
import { SincreditoCompensarComponent } from './pages/sincredito-compensar/sincredito-compensar.component';
import { OutlayMethodComponent } from './pages/outlay-method/outlay-method.component';
import { SincupoparacomprarComponent } from './pages/sincupoparacomprar/sincupoparacomprar.component';
import { MatSliderModule } from '@angular/material/slider';
import { DetailpaymentComponent } from './pages/detailpayment/detailpayment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PaymentDatesComponent } from './pages/payment-dates/payment-dates.component';
import { NoMatchDocComponent } from './pages/no-match-doc/no-match-doc.component';
import { NewAccFlowdebtComponent } from './pages/new-acc-flowdebt/new-acc-flowdebt.component';
import { NewAccFlowpayComponent } from './pages/new-acc-flowpay/new-acc-flowpay.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { BtnChatComponent } from './pages/btn-chat/btn-chat.component';
@NgModule({
  declarations: [OutlayNewComponent,CameraComponent,LoanPresentationComponent, LoanFormComponent, EmailConfirmComponent, ValidateEmailComponent, OtpComponent, ChooseAmountComponent, SimulationComponent, AuthorizationComponent, BiometricComponent, StatusComponent, ValidateBiometricComponent, BirthComponent, OccupationComponent, PreBiometricComponent, BiometricSuccessComponent, OtpSuccessComponent, AddAccountsComponent, DiscountedAccountsComponent, AcceptConditionsComponent, AcceptConditionsSuccessComponent, DocumentsComponent, FinishComponent, FaceComponent, IdentityResponseComponent, FingerprintMatchComponent, NewBankAccountComponent, DniComponent, InitialQueryComponent, InitAgentComponent, AuthDataComponent, AuthLoadDataComponent, OlimpiaComponent, QueryLoanSuccessComponent, FinishFlowComponent, AdditionalDataComponent, BankNoteComponent, PreApprovedComponent, ChooseAmountSuccessComponent, DniDetectorComponent, FaceDetectorComponent, FingerprintDetectorComponent, FeceDetectorPresentationComponent, DniDetectorPresentationComponent, DniValidationSuccessfullComponent, RejectpaymentComponent, RejectmegabaseComponent, CheckfaceComponent, RejectFacecheckComponent, OutlayComponent, PreCotizarComponent, DniConfirmComponent, SincreditoCompensarComponent, OutlayMethodComponent, SincupoparacomprarComponent, DetailpaymentComponent, PaymentDatesComponent, NoMatchDocComponent, NewAccFlowdebtComponent, NewAccFlowpayComponent, BackofficeComponent, BtnChatComponent],
  exports: [CameraComponent],
  entryComponents: [OutlayNewComponent], 
  imports: [
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
    MatSliderModule, 
    MatStepperModule,
    MatButtonToggleModule,
    FaceDetectorModule,
    DniDetectorModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatMenuModule
  ]
})
export class FunnelModule { }

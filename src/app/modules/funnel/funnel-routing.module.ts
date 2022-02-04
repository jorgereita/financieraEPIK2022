import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanPresentationComponent } from './pages/loan-presentation/loan-presentation.component';
import { LoanFormComponent } from './pages/loan-form/loan-form.component';
import { EmailConfirmComponent } from './pages/email-confirm/email-confirm.component';
import { ValidateEmailComponent } from './pages/validate-email/validate-email.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ChooseAmountComponent } from './pages/choose-amount/choose-amount.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import {AuthorizationComponent} from './pages/authorization/authorization.component';
import {BiometricComponent} from './pages/biometric/biometric.component';
import {StatusComponent} from './pages/status/status.component';
import {ValidateBiometricComponent} from './pages/validate-biometric/validate-biometric.component';
import {BirthComponent} from './pages/birth/birth.component';
import {OccupationComponent} from './pages/occupation/occupation.component';
import {PreBiometricComponent} from './pages/pre-biometric/pre-biometric.component';
import {BiometricSuccessComponent} from './pages/biometric-success/biometric-success.component';
import {OtpSuccessComponent} from './pages/otp-success/otp-success.component';
import {AddAccountsComponent} from './pages/add-accounts/add-accounts.component';
import {DiscountedAccountsComponent} from './pages/discounted-accounts/discounted-accounts.component';
import {AcceptConditionsComponent} from './pages/accept-conditions/accept-conditions.component';
import {AcceptConditionsSuccessComponent} from './pages/accept-conditions-success/accept-conditions-success.component';
import {DocumentsComponent} from './pages/documents/documents.component';
import {FinishComponent} from './pages/finish/finish.component';
import {FaceComponent} from './pages/face/face.component';
import {IdentityResponseComponent} from './pages/identity-response/identity-response.component';
import {FingerprintMatchComponent} from './pages/fingerprint-match/fingerprint-match.component';
import { NewBankAccountComponent } from './pages/new-bank-account/new-bank-account.component';
import {DniComponent} from './pages/dni/dni.component';
import {InitialQueryComponent} from './pages/initial-query/initial-query.component';
import { InitAgentComponent } from './pages/init-agent/init-agent.component';
import {AuthDataComponent} from './pages/auth-data/auth-data.component';
import {QueryLoanSuccessComponent} from './pages/query-loan-success/query-loan-success.component';
import {FinishFlowComponent} from './pages/finish-flow/finish-flow.component';
import {OlimpiaComponent} from './pages/olimpia/olimpia.component';
import {AdditionalDataComponent} from './pages/additional-data/additional-data.component';
import {BankNoteComponent} from './pages/bank-note/bank-note.component';
import {PreApprovedComponent} from './pages/pre-approved/pre-approved.component';
import {ChooseAmountSuccessComponent} from './pages/choose-amount-success/choose-amount-success.component';
import {FaceDetectorComponent} from './pages/face-detector/face-detector.component';
import {DniDetectorComponent} from './pages/dni-detector/dni-detector.component';
import {FingerprintDetectorComponent} from './pages/fingerprint-detector/fingerprint-detector.component';
import {FeceDetectorPresentationComponent} from './pages/fece-detector-presentation/fece-detector-presentation.component';
import {DniDetectorPresentationComponent} from './pages/dni-detector-presentation/dni-detector-presentation.component';
import {DniValidationSuccessfullComponent} from './pages/dni-validation-successfull/dni-validation-successfull.component';
import { RejectpaymentComponent } from './pages/rejectpayment/rejectpayment.component';
import { RejectmegabaseComponent } from './pages/rejectmegabase/rejectmegabase.component';
import { CheckfaceComponent } from './pages/checkface/checkface.component';
import { RejectFacecheckComponent } from './pages/reject-facecheck/reject-facecheck.component';
import { OutlayComponent } from './pages/outlay/outlay.component';
import { PreCotizarComponent } from './pages/pre-cotizar/pre-cotizar.component';
import { DniConfirmComponent } from './pages/dni-confirm/dni-confirm.component';
import { SincreditoCompensarComponent } from './pages/sincredito-compensar/sincredito-compensar.component';
import { OutlayMethodComponent } from './pages/outlay-method/outlay-method.component';
import { SincupoparacomprarComponent } from './pages/sincupoparacomprar/sincupoparacomprar.component';
import { PaymentDatesComponent } from './pages/payment-dates/payment-dates.component';
import { NoMatchDocComponent } from './pages/no-match-doc/no-match-doc.component';
import { NewAccFlowdebtComponent } from './pages/new-acc-flowdebt/new-acc-flowdebt.component';
import { NewAccFlowpayComponent } from './pages/new-acc-flowpay/new-acc-flowpay.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';

const routes: Routes = [
  {
    path: 'agent-home',
    component: InitAgentComponent,
  },
  {
    path: 'initial-query',
    component: InitialQueryComponent,
  },
  {
    path: 'query-loan-success',
    component: QueryLoanSuccessComponent,
  },
  {
    path: 'auth-data',
    component: AuthDataComponent,
  },
  {
    path: 'form',
    component: LoanFormComponent,
  },
  {
    path: 'reject',
    component: OlimpiaComponent,
  },
  {
    path: 'face-detector',
    component: FaceDetectorComponent,
  },
  {
    path: 'dni-detector',
    component: DniDetectorComponent,
  },
  {
    path: 'fingerprint-detector',
    component: FingerprintDetectorComponent,
  },
  {
    path: 'additional-data',
    component: AdditionalDataComponent,
  },
  {
    path: 'bank-note',
    component: BankNoteComponent,
  },
  {
    path: 'verify-payment',
    component: BirthComponent,
  },
  {
    path: 'validate-docs',
    component: OccupationComponent,
  },
  {
    path: 'whatsappquote',
    component: EmailConfirmComponent,
  },
  {
    path: 'validate-email/:token',
    component: ValidateEmailComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'choose-amount',
    component: ChooseAmountComponent,
  },
  {
    path: 'simulation',
    component: SimulationComponent,
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
  },
  {
    path: 'pre-approved',
    component: PreApprovedComponent,
  },
  {
    path: 'choose-amount-success',
    component: ChooseAmountSuccessComponent,
  },
  {
    path: 'pre-biometric',
    component: PreBiometricComponent,
  },
  {
    path: 'biometric',
    component: BiometricComponent,
  },
  {
    path: 'biometric/:itemSection',
    component: BiometricComponent,
  },
  {
    path: 'biometric-success',
    component: BiometricSuccessComponent,
  },
  {
    path: 'validate-biometric',
    component: ValidateBiometricComponent,
  },
  {
    path: 'otp-success',
    component: OtpSuccessComponent,
  },
  {
    path: 'add-accounts',
    component: AddAccountsComponent,
  },
  {
    path: 'discounted-accounts',
    component: DiscountedAccountsComponent,
  },
  {
    path: 'accept-conditions',
    component: AcceptConditionsComponent,
  },
  {
    path: 'accept-conditions-success',
    component: AcceptConditionsSuccessComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'status',
    component: StatusComponent,
  },
  {
    path: 'finish',
    component: FinishComponent,
  },
  {
    path: 'face-detector-presentation',
    component: FeceDetectorPresentationComponent,
  },
  {
    path: 'dni-detector-presentation',
    component: DniDetectorPresentationComponent,
  },
  {
    path: 'dni-confirm',
    component: DniConfirmComponent,
  },
  {
    path: 'dni-validation-successfull',
    component: DniValidationSuccessfullComponent,
  },
  {
    path: 'face-match',
    component: FaceComponent,
  },
  {
    path: 'fingerprint-match',
    component: FingerprintMatchComponent,
  },
  {
    path: 'identity-response',
    component: IdentityResponseComponent,
  },
  {
    path: 'new-bank-account',
    component: NewBankAccountComponent,
  },
  {
    path: 'success',
    component: DniComponent,
  },
  {
    path: 'finish-flow',
    component: FinishFlowComponent,
  },
  {
    path: 'reject-payment',
    component: RejectpaymentComponent,
  },
  {
    path: 'reject-megabase',
    component: RejectmegabaseComponent,
  },  
  {
    path: 'reject-facecheck',
    component: RejectFacecheckComponent,
  },
  {
    path: 'check-face',
    component: CheckfaceComponent,
  },
  {
    path: 'outlay',
    component: OutlayComponent,
  },
  {
    path: 'pre-cotizar',
    component: PreCotizarComponent,
  },
  {
    path: 'payment-dates',
    component: PaymentDatesComponent,
  },
  {
    path: 'outlay-method',
    component: OutlayMethodComponent,
  },
  {
    path: 'sincupoparacomprar',
    component: SincupoparacomprarComponent,
  },
  {
    path: 'no-match-doc',
    component: NoMatchDocComponent,
  },
  {
    path: 'new-acc-debt',
    component: NewAccFlowdebtComponent,
  },
  {
    path: 'new-acc-flowpay',
    component: NewAccFlowpayComponent,
  },
  {
    path: 'backoffice',
    component: BackofficeComponent,
  },
  {
    path: 'sincreditoCompensar',
    component: SincreditoCompensarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunnelRoutingModule { }

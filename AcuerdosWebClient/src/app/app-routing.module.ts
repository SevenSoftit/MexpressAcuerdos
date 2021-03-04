import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { FeedbackDescriptionModalComponent } from './shared/modal/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './shared/modal/feedback-modal/feedback-modal.component';
import { ImportProductComponent } from './components/import-product/import-product.component';
import { AddAgreementEvidenceModalComponent } from './shared/modal/add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { ListEvidencesModalComponent } from './shared/modal/list-evidences-modal/list-evidences-modal.component';
import { ConfirmModalComponent } from './shared/modal/confirm-modal/confirm-modal.component';
import { GoalsLoaderComponent } from './shared/modal/goals-loader/goals-loader.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path:'feedbackDescription', component: FeedbackDescriptionModalComponent},
  // { path:'feedbackModal', component: FeedbackModalComponent},
  // { path:'importProduct', component: ImportProductComponent},
  // { path:'addAgreementEvidence', component: AddAgreementEvidenceModalComponent},
  // { path:'listEvidence', component: ListEvidencesModalComponent},
  // { path:'confirmModal', component: ConfirmModalComponent},
  // { path:'goalsLoaderModal', component: GoalsLoaderComponent},
  { path: 'changePass', component: ChangePasswordModalComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './components/home/home.module#HomeModule' },
      { path: 'tradeAgreements', loadChildren: './components/trade-agreements/trade-agreements.module#TradeAgreementsModule' },
      { path: 'newTradeAgreements', loadChildren: './components/new-trade-agreements-detail/new-trade-agreements-detail.module#NewTradeAgreementsDetailModule' },
      { path: 'agreementTracking', loadChildren: './components/agreement-tracking/agreement-tracking.module#AgreementTrackingModule' },
      { path: 'agreementTrackingDetail', loadChildren: './components/agreement-tracking-detail/agreement-tracking-detail.module#AgreementTrackingDetailModule' },
      { path: 'agreementReport', loadChildren: './components/agreement-report/agreement-report.module#AgreementReportModule' },
      { path: 'agreementConciliation', loadChildren: './components/agreement-conciliation/agreement-conciliation.module#AgreementConciliationModule' },
      { path: 'agreementConciliationDetail', loadChildren: './components/agreement-conciliation-detail/agreement-conciliation-detail.module#AgreementConciliationDetailModule' },
      { path: 'feedbackDescription', component: FeedbackDescriptionModalComponent },
      { path: 'feedbackModal', component: FeedbackModalComponent },
      { path: 'importProduct', component: ImportProductComponent },
      { path: 'addAgreementEvidence', component: AddAgreementEvidenceModalComponent },
      { path: 'listEvidence', component: ListEvidencesModalComponent },
      { path: 'confirmModal', component: ConfirmModalComponent },
      { path: 'goalsLoaderModal', component: GoalsLoaderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

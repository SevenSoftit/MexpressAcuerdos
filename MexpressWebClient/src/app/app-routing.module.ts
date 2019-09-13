import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/services/auth/auth-guard.service';

const routes: Routes = [
  {path: '', loadChildren: './components/login/login.module#LoginModule'},
  { path:'forgotPassword', loadChildren: './components/forgot-password/forgot-password.module#ForgotPasswordModule'},
  {path: 'changePass', loadChildren: './components/change-password/change-password-modal.module#ChangePasswordModalModule'},
  {path: 'feedbackDescription', loadChildren: './components/feedback-description-modal/feedback-description-modal.module#FeedbackDescriptionModalComponent'},
  {path: 'feedbackModal', loadChildren: './components/feedback-modal/feedback-modal.module#FeedbackModalComponent'},
  { path: 'importProduct', pathMatch: 'full', loadChildren: './components/import-product/import-product.module#ImportProductModule' },
  {path: 'addAgreementEvidence', loadChildren: './components/add-agreement-evidence-modal/add-agreement-evidence-modal.module#AddEvidenceModalModule'},
  {path: 'listEvidence', loadChildren: './components/list-evidences-modal/list-evidences-modal.module#ListEvidencesModalModule'},
  {path: 'confirmModal', loadChildren: './components/confirm-modal/confirm-modal.module#ConfirmModalModule'},
  {path: 'goalsLoaderModal', loadChildren: './components/goals-loader/goals-loader.module#GoalsLoaderModule'},
  
  {
    path: '',
    component: LayoutComponent,  
    children: [
      {path: 'home', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', loadChildren: './components/home/home.module#HomeModule' },
      {path: 'tradeAgreements', loadChildren: './components/trade-agreements/trade-agreements.module#TradeAgreementsModule'},
      {path: 'newTradeAgreements', loadChildren: './components/new-trade-agreements-detail/new-trade-agreements-detail.module#NewTradeAgreementsDetailModule'},
      {path: 'agreementTracking', loadChildren: './components/agreement-tracking/agreement-tracking.module#AgreementTrackingModule'},
      {path: 'agreementTrackingDetail', loadChildren: './components/agreement-tracking-detail/agreement-tracking-detail.module#AgreementTrackingDetailModule'},
      {path: 'agreementReport', loadChildren: './components/agreement-report/agreement-report.module#AgreementReportModule'},
      {path: 'agreementConciliation', loadChildren: './components/agreement-conciliation/agreement-conciliation.module#AgreementConciliationModule'},
      {path: 'agreementConciliationDetail', loadChildren: './components/agreement-conciliation-detail/agreement-conciliation-detail.module#AgreementConciliationDetailModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

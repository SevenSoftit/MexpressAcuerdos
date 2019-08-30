import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { LayoutComponent } from './components/layout/layout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { FeedbackDescriptionModalComponent } from './components/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { ImportProductComponent } from './components/import-product/import-product.component';
import { ListEvidencesModalComponent } from './components/list-evidences-modal/list-evidences-modal.component';
import { AddAgreementEvidenceModalComponent } from './components/add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { GoalsLoaderComponent } from './components/goals-loader/goals-loader.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
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
      {path: 'agreementReport', loadChildren: './components/agreement-report/agreement-report.module#AgreementReportModule'}
    ]
  }, 

  {path:'changePass', component: ChangePasswordModalComponent},
  {path: 'feedbackDescription', component: FeedbackDescriptionModalComponent},
  {path: 'feedbackModal', component: FeedbackModalComponent},
  { path: 'importProduct', pathMatch: 'full', component: ImportProductComponent },
  {path: 'addAgreementEvidence', component: AddAgreementEvidenceModalComponent},
  {path: 'listEvidence', component: ListEvidencesModalComponent},
  {path: 'confirmModal', component: ConfirmModalComponent},
  {path: 'goalsLoaderModal', component: GoalsLoaderComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { LayoutComponent } from './components/layout/layout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { FeedbackDescriptionModalComponent } from './components/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';

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
      {path: 'newTradeAgreements', loadChildren: './components/new-trade-agreements/new-trade-agreements.module#NewTradeAgreementsModule'},
    ]
  }, 

  {path:'changePass', component: ChangePasswordModalComponent},
  {path: 'feedbackDescription', component: FeedbackDescriptionModalComponent},
  {path: 'feedbackModal', component: FeedbackModalComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

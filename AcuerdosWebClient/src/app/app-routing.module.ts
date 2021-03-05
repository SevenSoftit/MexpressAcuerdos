import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', redirectTo: 'home', pathMatch: 'full' },

      // { path: 'home', loadChildren: './components/home/home.module#HomeModule' },
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
      
      // { path: 'tradeAgreements', loadChildren: './components/trade-agreements/trade-agreements.module#TradeAgreementsModule' },
      {
        path: 'tradeAgreements',
        loadChildren: () => import('./components/trade-agreements/trade-agreements.module').then(m => m.TradeAgreementsModule)
      },
      // { path: 'newTradeAgreements', loadChildren: './components/new-trade-agreements-detail/new-trade-agreements-detail.module#NewTradeAgreementsDetailModule' },
      {
        path: 'newTradeAgreements',
        loadChildren: () => import('./components/new-trade-agreements-detail/new-trade-agreements-detail.module').then(m => m.NewTradeAgreementsDetailModule)
      },    
      // { path: 'agreementTracking', loadChildren: './components/agreement-tracking/agreement-tracking.module#AgreementTrackingModule' },
      {
        path: 'agreementTracking',
        loadChildren: () => import('./components/agreement-tracking/agreement-tracking.module').then(m => m.AgreementTrackingModule)
      },

      // { path: 'agreementTrackingDetail', loadChildren: './components/agreement-tracking-detail/agreement-tracking-detail.module#AgreementTrackingDetailModule' },
      {
        path: 'agreementTrackingDetail',
        loadChildren: () => import('./components/agreement-tracking-detail/agreement-tracking-detail.module').then(m => m.AgreementTrackingDetailModule)
      },
      // { path: 'agreementReport', loadChildren: './components/agreement-report/agreement-report.module#AgreementReportModule' },
      {
        path: 'agreementReport',
        loadChildren: () => import('./components/agreement-report/agreement-report.module').then(m => m.AgreementReportModule)
      },
      // { path: 'agreementConciliation', loadChildren: './components/agreement-conciliation/agreement-conciliation.module#AgreementConciliationModule' },
      {
        path: 'agreementConciliation',
        loadChildren: () => import('./components/agreement-conciliation/agreement-conciliation.module').then(m => m.AgreementConciliationModule)
      },
      // { path: 'agreementConciliationDetail', loadChildren: './components/agreement-conciliation-detail/agreement-conciliation-detail.module#AgreementConciliationDetailModule' },
      {
        path: 'agreementConciliationDetail',
        loadChildren: () => import('./components/agreement-conciliation-detail/agreement-conciliation-detail.module').then(m => m.AgreementConciliationDetailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

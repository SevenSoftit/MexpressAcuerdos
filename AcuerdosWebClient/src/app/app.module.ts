import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es');
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
// import the GridModule for the Grid component
import { ToolbarService, EditService, PageService, FilterService, SortService} from '@syncfusion/ej2-angular-grids';

// rutas
import { AppRoutingModule } from './app-routing.module';

// servicios
import { environment } from 'src/environments/environment';
import { ApplicationPipesModule } from './shared/helper/application-pipes.module';
import { LoginService } from './shared/services/login/login.service';
import { CommonService } from './shared/services/common/common.service';
import { ErrorDialogService } from './shared/services/interceptor/errordialog.service';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpinterceptorService } from './shared/services/interceptor/httpinterceptor.service';
import { LoginComponent } from './components/login/login.component';
import { AddAgreementEvidenceModalComponent } from './shared/modal/add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { ListEvidencesModalComponent } from './shared/modal/list-evidences-modal/list-evidences-modal.component';
import { ConfirmModalComponent } from './shared/modal/confirm-modal/confirm-modal.component';
import { GoalsLoaderComponent } from './shared/modal/goals-loader/goals-loader.component';
import { LayoutModule } from './shared/layout/layout.module';
import { LoadingModule } from './shared/loading/loading.module';
import { TradeAgreementsModule } from './components/trade-agreements/trade-agreements.module';
import { NewTradeAgreementsDetailModule } from './components/new-trade-agreements-detail/new-trade-agreements-detail.module';
import { AgreementTrackingDetailModule } from './components/agreement-tracking-detail/agreement-tracking-detail.module';
import { AgreementTrackingModule } from './components/agreement-tracking/agreement-tracking.module';
import { AgreementConciliationModule } from './components/agreement-conciliation/agreement-conciliation.module';
import { AgreementConciliationDetailModule } from './components/agreement-conciliation-detail/agreement-conciliation-detail.module';
import { AgreementReportModule } from './components/agreement-report/agreement-report.module';
import { FeedbackDescriptionModalComponent } from './shared/modal/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './shared/modal/feedback-modal/feedback-modal.component';
import { SharedModule } from './shared-module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { ChangePasswordModalComponent } from './shared/modal/change-password-modal/change-password-modal.component';
import { ImportProductComponent } from './shared/modal/import-product/import-product.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FeedbackModalComponent,
    FeedbackDescriptionModalComponent,
    ImportProductComponent,
    AddAgreementEvidenceModalComponent,
    ListEvidencesModalComponent,
    ConfirmModalComponent,
    GoalsLoaderComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production}),
    BrowserAnimationsModule,
    DropzoneModule,
    ApplicationPipesModule,  
    LayoutModule,
    LoadingModule,
    TradeAgreementsModule,
    NewTradeAgreementsDetailModule,
    AgreementTrackingModule,
    AgreementTrackingDetailModule,
    AgreementConciliationModule,
    AgreementConciliationDetailModule,
    AgreementReportModule,
    ForgotPasswordModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    FeedbackModalComponent,
    FeedbackDescriptionModalComponent,
    ImportProductComponent,
    AddAgreementEvidenceModalComponent,
    ListEvidencesModalComponent,
    ConfirmModalComponent,
    GoalsLoaderComponent,
    ChangePasswordModalComponent
  ],

  providers: [
    LoginService, CommonService, ErrorDialogService, AuthGuard,AuthService,
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true
  },
  { provide: LOCALE_ID, useValue: 'es' },
  ToolbarService, EditService, PageService, FilterService, SortService, TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

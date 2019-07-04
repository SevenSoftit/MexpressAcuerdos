import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { MaterialModule } from './material-module';
import { LayoutModule } from './components/layout/layout.module';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es');
import { NgxLoadingModule } from 'ngx-loading';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ApplicationPipesModule } from 'src/app/application-pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
// import the GridModule for the Grid component
import { GridModule, ToolbarService, EditService, PageService, FilterService, SortService} from '@syncfusion/ej2-angular-grids';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'

// Modal Components
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { FeedbackDescriptionModalComponent } from './components/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';

// rutas
import { AppRoutingModule } from './app-routing.module';

// servicios
import { LoginService } from './services/login/login.service';
import { CommonService } from './services/common/common.service';
import { HttpinterceptorService } from './services/interceptor/httpinterceptor.service';
import { ErrorDialogService } from 'src/app/services/interceptor/errordialog.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordModalComponent,
    FeedbackDescriptionModalComponent,
    FeedbackModalComponent 
  ],
  imports: [
    MaterialModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production}),
    BrowserAnimationsModule,
    DropzoneModule,
    ApplicationPipesModule,
    GridModule

  ],
  entryComponents: [
    
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

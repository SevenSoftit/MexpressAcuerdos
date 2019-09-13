import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy, 'es');
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
// import the GridModule for the Grid component
import { GridModule, ToolbarService, EditService, PageService, FilterService, SortService} from '@syncfusion/ej2-angular-grids';

// rutas
import { AppRoutingModule } from './app-routing.module';

// servicios
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material-module';
import { ApplicationPipesModule } from './shared/helper/application-pipes.module';
import { LoginService } from './shared/services/login/login.service';
import { CommonService } from './shared/services/common/common.service';
import { ErrorDialogService } from './shared/services/interceptor/errordialog.service';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpinterceptorService } from './shared/services/interceptor/httpinterceptor.service';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    GridModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ScrollDispatchModule
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

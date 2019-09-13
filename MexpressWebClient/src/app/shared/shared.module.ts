import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { ApplicationPipesModule } from './helper/application-pipes.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AddEvidenceModalModule } from './modal/add-agreement-evidence-modal/add-agreement-evidence-modal.module';
import { ConfirmModalModule } from './modal/confirm-modal/confirm-modal.module';
import { FeedbackDescriptionModalModule } from './modal/feedback-description-modal/feedback-description-modal.module';
import { FeedbackModalModule } from './modal/feedback-modal/feedback-modal.module';
import { GoalsLoaderModule } from './modal/goals-loader/goals-loader.module';
import { ListEvidencesModalModule } from './modal/list-evidences-modal/list-evidences-modal.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarLeftComponent } from './layout/sidebar-left/sidebar-left.component';
import { AddAgreementEvidenceModalComponent } from './modal/add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { FeedbackDescriptionModalComponent } from './modal/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from './modal/feedback-modal/feedback-modal.component';
import { GoalsLoaderComponent } from './modal/goals-loader/goals-loader.component';
import { ListEvidencesModalComponent } from './modal/list-evidences-modal/list-evidences-modal.component';
import { AgreementReportService } from './services/agreementReport/agreementReport.service';
import { AllMoneyService } from './services/allMoney/allMoney.service';
import { AuthService } from './services/auth/auth.service';
import { CommonService } from './services/common/common.service';
import { DashboardResumeService } from './services/dashboardResume/dashboardResume.service';
import { EvidenceService } from './services/evidence/evidence.service';
import { ErrorDialogService } from './services/interceptor/errordialog.service';
import { HttpinterceptorService } from './services/interceptor/httpinterceptor.service';
import { LabelsService } from './services/labels/labels.service';
import { LanguageService } from './services/language/language.service';
import { LoginService } from './services/login/login.service';
import { OrganizationService } from './services/organization/organization.service';
import { ProviderService } from './services/TaProvider/provider.service';
import { TradeAgreementDetailService } from './services/tradeAgreementDetail/tradeAgreementDetail.service';
import { TypeOfAgreementService } from './services/typeOfAgreement/typeOfAgreement.service';
import { CustomRequestOptions } from './services/CustomRequestOptions';
import { HttpProvider } from './services/interceptor-http';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule, ToolbarService, EditService, PageService, FilterService, SortService, FreezeService, ResizeService, ExcelExportService, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaterialModule } from '../material-module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';


/* our own custom components */
const routes: Routes = [{ path: '', component: LayoutComponent }];

@NgModule({
    imports: [
        ApplicationPipesModule,
        LayoutModule,
        AddEvidenceModalModule,
        ConfirmModalModule,
        FeedbackDescriptionModalModule,
        FeedbackModalModule,
        GoalsLoaderModule,
        ListEvidencesModalModule,
        // Angular Material
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        GridModule,
        ScrollDispatchModule,
        DropDownListAllModule,
        MatDatepickerModule,
        MaterialModule,
        MatTooltipModule,
        MatSelectInfiniteScrollModule,
        ScrollingModule

    ],
    entryComponents: [
    ],
    declarations: [
        /* custom components */
        FooterComponent,
        HeaderComponent,
        SidebarLeftComponent,
        LayoutComponent,
        AddAgreementEvidenceModalComponent,
        ConfirmModalComponent,
        FeedbackDescriptionModalComponent,
        FeedbackModalComponent,
        GoalsLoaderComponent,
        ListEvidencesModalComponent,
    ],
    exports: [

    ],
    providers: [
        /** custom services */
        AgreementReportService,
        AllMoneyService,
        AuthService,
        CommonService,
        DashboardResumeService,
        EvidenceService,
        ErrorDialogService,
        HttpinterceptorService,
        LabelsService,
        LanguageService,
        LoginService,
        OrganizationService,
        ProviderService,
        TradeAgreementDetailService,
        TypeOfAgreementService,
        CustomRequestOptions,
        HttpProvider,
        // Syncfusion
        ToolbarService,
        EditService,
        PageService,
        FilterService,
        SortService,
        FreezeService,
        ResizeService,
        ExcelExportService,
        PdfExportService

    ]
})
export class SharedModule { }


import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { GridComponent, GridLine } from '@syncfusion/ej2-angular-grids';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderModel } from 'src/app/models/provider.model';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';
import { AgreementProductInfoModel } from 'src/app/models/agreementProductInfo.model';
import { AgreementProductInfoDetailModel } from 'src/app/models/agreementProductInfoDetail.model';
import { Tooltip } from '@syncfusion/ej2-popups';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { utiles } from 'src/environments/utiles';
import { CatalogModel } from 'src/app/models/catalog.Model';
import { FeedbackDescriptionModalComponent } from 'src/app/shared/modal/feedback-description-modal/feedback-description-modal.component';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { GoalsLoaderComponent } from 'src/app/shared/modal/goals-loader/goals-loader.component';
import { AgreementReportService } from 'src/app/shared/services/agreementReport/agreementReport.service';
import { ProviderService } from 'src/app/shared/services/TaProvider/provider.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { TypeOfAgreementService } from 'src/app/shared/services/typeOfAgreement/typeOfAgreement.service';
import { TradeAgreementDetailService } from 'src/app/shared/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { ListEvidencesModalComponent } from 'src/app/shared/modal/list-evidences-modal/list-evidences-modal.component';
import { AgreementDocumentModel } from 'src/app/models/agreementDocument.model';
import { EvidenceService } from 'src/app/shared/services/evidence/evidence.service';
import { NewAgreementModel } from 'src/app/models/newAgreement.model';
declare var require: any

@Component({
  selector: 'app-agreement-tracking-detail',
  templateUrl: './agreement-tracking-detail.component.html',
  styleUrls: ['./agreement-tracking-detail.component.scss']
})
export class AgreementTrackingDetailComponent implements OnInit {
  newAgreementForm: FormGroup;
  type_of_agreement: any;
  providerN: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  public dataTable: any[] = [];
  public dataTableDetail: any[] = [];
  public initialSort: Object;
  public pageSettings: Object;
  screenHeight: any;
  screenWidth: any;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | Object;
  public headerFile: number = 0;
  public active: boolean = false;
  title = 'Todos los acuerdos comerciales';
  agreement_activator: boolean = false;
  showGoals = false;
  allproducts_activator = false;
  dateProcess: Date = new Date();
  dateReprocess: Date = new Date();
  fk_Status_Agreement: number = 0;
  agreementDetail: any;
  fk_Glb_Mtr_Organization: number = 1;
  providerList: any = [];
  public typeOfAgreementModel: TypeOfAgreementModel = new TypeOfAgreementModel();
  public providerModel: ProviderModel = new ProviderModel();
  typeOfAgreementList: any = [];
  behaviorTA: string = '';
  showAgreementResumeTable: boolean = true;
  showAgreementResultTable: boolean = false;
  heightGridLW: any;
  enableEntireAgreement: boolean = true;
  enableArrow: boolean = false;
  option = true;
  SearchInfo: any = [];
  //#region InfiniteScrollVariables
  total = 0;
  data: any = [];
  limit = 7;
  offset = 0;
  options = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;
  pageNumber = 1;
  completeLoad = false;
  percentage: string = '25%'  
  //#endregion InfiniteScrollVariables
  maxAmountToggle = false;
  maxAmount: string = '0';
  showAmountInput = false;
  emailNotification: string = '';
  enablePdfExport: boolean = false;
  newAgreementDetailHeaderModel: NewAgreementDetailHeaderModel = new NewAgreementDetailHeaderModel();
  infoUser = utiles.getInfoUser();
  search_key: string = 'agreement_status_finished';
  catalogModel: CatalogModel = new CatalogModel();
  nameAgree: string = '';
  listValidation: any = [];
  onAdd = new EventEmitter();
  disabledButtonFinalization: boolean = false;
  public lines: GridLine;
  public arrayEvidences: any[] = [];
  public string_Total_Recovery: string = '0';
  public string_Total_Recovery_Dollars: string = '0';
  public inventory_Date: Date;

  constructor(private evidenceService: EvidenceService, private reportService: AgreementReportService, public matDialog: MatDialog, private activated_route: ActivatedRoute, private providerService: ProviderService, private _common: CommonService, private typeOfAgreementService: TypeOfAgreementService,
    private tradeAgreementDetailService: TradeAgreementDetailService, private router: Router) {
    this._common._setLoading(true);
    this.activated_route.queryParams.subscribe(params => {
      var parameters = params["agreementDet"];

      if (parameters != undefined) {
        this.agreementDetail = JSON.parse(parameters);
        if (this.agreementDetail.info.pk_Ac_Trade_Agreement !== null && this.agreementDetail.info.pk_Ac_Trade_Agreement !== undefined) {
          this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          this.active = this.agreementDetail.info.active;
          this.getAgreementInfo();

        }
      }
    });
  }

  ngOnInit() {
    this.getScreenSize();
    
    // this.listAllEvidences();
    
    this.options$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        if (this.providerModel.Name_Provider === '') {
          return [...acc, ...curr];
        } else {
          return [...curr];
        }

      }, [])
    );

    this.newAgreementForm = new FormGroup({
      agreement_name: new FormControl('', [Validators.required]),
      startDatePicker: new FormControl(new Date()),
      endDatePicker: new FormControl(new Date()),
      inventory_Date: new FormControl(new Date()),
      description: new FormControl(''),
      emailNotification: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      accountingAccount: new FormControl('')
    });

    // this.initialSort = { columns: [{ field: 'product_Name', direction: 'Ascending' }] };
    this.lines = 'Both';
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.toolbar = ['Search', { text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];
  }

  getAgreementInfo(){
    this._common._setLoading(true);
    var data = new NewAgreementDetailHeaderModel();
    data.Active = this.active;
    data.Pk_Ac_Trade_Agreement = this.headerFile
    this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
      dataQ => {
          if (dataQ != undefined && dataQ.length !== 0) {
            dataQ = dataQ.filter(dataOpt => dataOpt.agreement_Status_Name !== 'All' && dataOpt.provider_Name !== 'All');
            this.behaviorTA = dataQ[0].behavior;
            this.providerModel.Name_Provider = dataQ[0].provider_Name;
            this.showGoals = dataQ[0].all_Products;
            this.nameAgree = dataQ[0].name_Agreement;
            this.disabledButtonFinalization = (dataQ[0].agreement_Status_Name == 'Finalizado' || dataQ[0].agreement_Status_Name == 'Conciliado') ? true : false;
  
            if (dataQ[0].max_Amount !== 0) {
              this.maxAmountToggle = true;
              this.showAmountInput = true;
            }


            this.newAgreementForm.patchValue({
              agreement_name:dataQ[0].name_Agreement,
              description: dataQ[0].description_Agreement,
              startDatePicker: new Date(dataQ[0].date_Start),
              endDatePicker: new Date(dataQ[0].date_Finish),
              inventory_Date: dataQ[0].inventory_Date,
              emailNotification: dataQ[0].email,
              accountingAccount: dataQ[0].accounting_Account
            });  
            this.headerFile = dataQ[0].pk_Ac_Trade_Agreement;
            this.type_of_agreement = dataQ[0].pk_Cat_Type_Agreement;
            this.providerN = dataQ[0].pk_Ac_Cat_Provider;
            this.dateProcess = dataQ[0].date_Process;
            this.dateReprocess = dataQ[0].date_Reprocess;
            this.allproducts_activator = dataQ[0].all_Products;
            this.fk_Status_Agreement = dataQ[0].fk_Status_Agreement;
            this.agreement_activator = dataQ[0].active;
            this.fk_Glb_Mtr_Organization = dataQ[0].fk_Glb_Mtr_Organization;
            this.maxAmount = String(dataQ[0].max_Amount);
            this.string_Total_Recovery = String(dataQ[0].string_Total_Recovery);
            this.string_Total_Recovery_Dollars = String(dataQ[0].string_Total_Recovery_Dollars);
          } else {  
            this.newAgreementForm.setValue({
              agreement_name: '',  
              description: '',
              startDatePicker: new Date(),
              endDatePicker: new Date(),
              inventory_Date: new Date(),
              emailNotification: '',
              accountingAccount: ''
            });
          }
          // this.updateInventory();
          this.listAllEvidences();
        
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });

  }

  listAllEvidences() {
    var evidenceKey = new AgreementDocumentModel();
    evidenceKey.Pk_Ac_Trade_Agreement = this.headerFile;
    this.evidenceService.listEvidence(evidenceKey).subscribe(
      dataQ => {
        this.arrayEvidences = dataQ;
 
        this.listTypeOfAgreement();

      },
      error => {
        this._common._setLoading(false);
      }
    );
  }

  openListEvidenceModal() {
    if(!this.showGoals){
      this.grid.endEdit();
    }
    const object = {
      header_File: this.headerFile,
      name_Agree: this.nameAgree,
      is_Invoice: false
    }
    const dialogRef = this.matDialog.open(ListEvidencesModalComponent, {
      data: { confirmInfo: object }, disableClose: true,
      minWidth: "900px",
      maxWidth: "950px",
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data !== false) {
        this.arrayEvidences = data;
      } 
    });
  }

  openListElectronicInvoiceModal() {
    if(!this.showGoals){
      this.grid.endEdit();
    }
    const object = {
      header_File: this.headerFile,
      name_Agree: this.nameAgree,
      is_Invoice: true
    }
    const dialogRef = this.matDialog.open(ListEvidencesModalComponent, {
      data: { confirmInfo: object }, disableClose: true,
      minWidth: "900px",
      maxWidth: "950px",
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data !== false) {
        this.arrayEvidences = data;
      } 
    });
  }

  updateInventory(){
    var newAgreementM: NewAgreementModel = new NewAgreementModel();
    // this.dataTable.forEach(element => {
    //   var entity: TableEntityGenericModel = new TableEntityGenericModel();
    //   entity.CODE = (element.product_Id_Alias).toString();
    //   newAgreementM.Product_Codes_List.push(entity);
    // });
    newAgreementM.Pk_Ac_Trade_Agreement = this.headerFile;
    this.tradeAgreementDetailService.updateInventory(newAgreementM).subscribe(
      dataQ => {
        this.listAgreementDResume();    
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }
  listAgreementDResume() {
    var agreementProductInfoModel = new AgreementProductInfoModel();
    agreementProductInfoModel.Pk_Ac_Trade_Agreement = this.headerFile;
    agreementProductInfoModel.Behavior = this.behaviorTA;
    this.tradeAgreementDetailService.listAgreementDetailsResume(agreementProductInfoModel).subscribe(
      dataI => {
        this.dataTable = dataI;
        this.grid.refresh();
        this.getKeyStatus();  
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }
  getKeyStatus() {
    this.catalogModel.Search_Key = this.search_key;
    this._common.listCatalog(this.catalogModel).subscribe(
      dataF => {
        this.fk_Status_Agreement = dataF[0].pk_Glb_Cat_Catalog;
        this.listProvider(this.option);
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }
    /*******************************************************
* Author: Gustavo ZC
* Creation date:  08/07/2019
* Description: method that list all providers
****************************************************/
listProvider(option) {
  this.providerModel.Page_Number = this.pageNumber;
  this.providerModel.Rows_Page = this.limit;
  this.providerService.listProvider(this.providerModel).subscribe(
    dataG => {
      if (this.pageNumber == 1) {
        this.pageNumber = 1;
        this.total = dataG.length == 0 ? 0 : dataG[0].total_Row;
      }

      this.providerList = dataG;

      if (option == true && this.providerModel.Name_Provider !== "") {
        this.providerList.forEach(element => {
          this.SearchInfo.push(element)
        });
        this.options.next(this.SearchInfo);
        this._common._setLoading(false);
      }

      else if (option == false) {
        this.providerList.forEach(element => {
          this.SearchInfo.push(element)
        });
        this.options.next(this.SearchInfo);
        this._common._setLoading(false);
      }

      else if (option == true && this.providerModel.Name_Provider === "") {
        this.options.next(this.providerList);
        this._common._setLoading(false);
      }

    },
    error => {
      this._common._setLoading(false);
      console.error(error);
    }
  )
}

  
  saveAgreementHeader() {
    this._common._setLoading(true);
    // var filterProviderName: any = this.providerList.filter(obj => obj.pk_Ac_Cat_Provider == this.providerN);
    this.newAgreementDetailHeaderModel.Pk_Ac_Trade_Agreement = this.headerFile;
    this.newAgreementDetailHeaderModel.Pk_Cat_Type_Agreement = this.type_of_agreement;
    this.newAgreementDetailHeaderModel.Pk_Ac_Cat_Provider = this.providerN;
    this.newAgreementDetailHeaderModel.Creation_User = this.infoUser.username;
    this.newAgreementDetailHeaderModel.Modification_User = this.infoUser.username;
    this.newAgreementDetailHeaderModel.Name_Agreement = this.newAgreementForm.value.agreement_name;
    this.newAgreementDetailHeaderModel.Description_Agreement = this.newAgreementForm.value.description;
    this.newAgreementDetailHeaderModel.Date_Start = this.newAgreementForm.value.startDatePicker;
    this.newAgreementDetailHeaderModel.Date_Finish = this.newAgreementForm.value.endDatePicker;
    this.newAgreementDetailHeaderModel.Date_Process = this.dateProcess;
    this.newAgreementDetailHeaderModel.Date_Reprocess = this.dateReprocess;
    this.newAgreementDetailHeaderModel.All_Products = this.allproducts_activator;
    // this.newAgreementDetailHeaderModel.Provider_Name = (filterProviderName.length == 0 ? '' : filterProviderName[0].name_Provider);
    this.newAgreementDetailHeaderModel.Provider_Name = '';
    this.newAgreementDetailHeaderModel.Fk_Status_Agreement = this.fk_Status_Agreement;
    this.newAgreementDetailHeaderModel.Active = this.agreement_activator;
    this.newAgreementDetailHeaderModel.Fk_Glb_Mtr_Organization = this.fk_Glb_Mtr_Organization;
    this.newAgreementDetailHeaderModel.Max_Amount = Number(this.maxAmount);
    this.newAgreementDetailHeaderModel.Email = this.newAgreementForm.value.emailNotification;
    this.newAgreementDetailHeaderModel.Conciliation_User = '';
    this.newAgreementDetailHeaderModel.Conciliation_Date = new Date();
    this.newAgreementDetailHeaderModel.Accounting_Account = this.newAgreementForm.value.accountingAccount;

    this.tradeAgreementDetailService.saveAgreementHeader(this.newAgreementDetailHeaderModel).subscribe(
      data => {
        this._common._setLoading(false);
        this.directFinalizationModal();
      },
      () => {

      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth < 1536) {
      this.heightGridLW = 220;
    } else if (this.screenWidth >= 1536 && this.screenWidth < 1900 && this.screenWidth != 1680) {
      this.heightGridLW = 190;
    }
    else if (this.screenWidth > 1900) {
      this.heightGridLW = 420;
    }
    else if (this.screenWidth == 1680) {
      this.heightGridLW = 230;
    }

    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 9, pageCount: 5 };
    } else {
      this.pageSettings = { pageSize: 5, pageCount: 5 };
    }
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };



  // dataBound() {
  //   if (this.grid.columns.length > 9) {
  //     this.grid.autoFitColumns();
  //   }
  // }



  // Opcion para Excel
  toolbarClickProduct(args: ClickEventArgs): void {
    if (args.item.id == "export") {
      var date = new Date().toISOString().slice(0, 10);
      var archiveName = 'Reporte_General_Por_Articulo_Acuerdo_' + this.agreementDetail.info.name_Agreement + '_' + date + '.xlsx'

      const excelExportProperties: ExcelExportProperties = {
        fileName: archiveName
      };

      this.grid.excelExport(excelExportProperties);
    }
  }

  toolbarClickGeneral(args: ClickEventArgs): void {
    if (args.item.id == "export") {
      var date = new Date().toISOString().slice(0, 10);
      var archiveName = 'Reporte_Detallado_Acuerdo_' + this.agreementDetail.info.name_Agreement +'_'+ date + '.xlsx' 

      const excelExportProperties: ExcelExportProperties = {
        fileName: archiveName
      };

      this.grid.excelExport(excelExportProperties);
    }
  }

  listTypeOfAgreement() {
    this.typeOfAgreementService.listTypeOfAgreement(this.typeOfAgreementModel).subscribe(
      dataS => {
        this.typeOfAgreementList = dataS;
        // this.fillFormAgreementDetail();
        this.updateInventory();
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }


  /*******************************************************
  * Author: Gustavo ZC
  * Creation date:  22/08/2019
  * Description: method that helps infinite scroll to show more info
  ****************************************************/
  getNextBatch() {

    this.option = true;
    this.offset += this.limit; // variable that will set the end of infinite scroll when reach the total_rows
    this.pageNumber++; // variable for pagination

    if (this.pageNumber <= this.total) {
      this.listProvider(this.option);
    }
  }

  /*******************************************************
  * Author: esalas
  * Creation date:  16/08/2019
  * Description: method that search an specific provider
  ****************************************************/
  providerSearch(event) {

    this.SearchInfo = [];
    this.providerModel.Name_Provider = event.target.value;
    this.pageNumber = 1;
    this.option = false;
    this.listProvider(this.option);
  }

  viewAgreementProductD(args: any): void {
    let data: any = this.grid.getRowInfo(args.target).rowData;
    var agreementProductInfoDetailModel = new AgreementProductInfoDetailModel();
    agreementProductInfoDetailModel.Pk_Ac_Trade_Agreement = this.headerFile;
    agreementProductInfoDetailModel.Pk_Cat_Agreement_Details_Resume = data.pk_Cat_Agreement_Details_Resume;
    agreementProductInfoDetailModel.Behavior = this.behaviorTA;
    agreementProductInfoDetailModel.Product_Id = data.product_Id;

    this.tradeAgreementDetailService.viewAgreementProductDetails(agreementProductInfoDetailModel).subscribe(
      dataJ => {
        this.enableEntireAgreement = false;
        this.enableArrow = true;
        this.dataTableDetail = dataJ;
        this.grid.refresh();
        this.showAgreementResumeTable = false;
        this.showAgreementResultTable = true;
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }

  seeDetailOfTheEntireAgreement(): void {
    this._common._setLoading(true);
    this.enablePdfExport = true;
    var agreementProductInfoDetailModel = new AgreementProductInfoDetailModel();
    agreementProductInfoDetailModel.Pk_Ac_Trade_Agreement = this.headerFile;
    agreementProductInfoDetailModel.Behavior = this.behaviorTA;
    agreementProductInfoDetailModel.Product_Id = '';

    this.tradeAgreementDetailService.viewAgreementProductDetails(agreementProductInfoDetailModel).subscribe(
      dataS => {
        this.enableEntireAgreement = false;
        this.enableArrow = true;
        this.dataTableDetail = dataS;
        this.showAgreementResumeTable = false;
        this.showAgreementResultTable = true;
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }

  finishAgreement(): void {
    var isInvoiceArray = this.arrayEvidences.filter(x => x.is_Invoice == true);

    if(isInvoiceArray.length !== 0){
      if (this.agreementDetail.info.expired_Indicator == true) {
        this.expiryIndicationModal();
      } else {
        this.disabledButtonFinalization = true;
        this.saveAgreementHeader();
      }

    }else{
        this.noElectronicBillModal();
    }

  }

  public expiryIndicationModal() {

    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'Está finalizando el acuerdo antes de su fecha de vencimiento. ¿Desea continuar? Este proceso no es reversible',
      btnAccept: 'Aceptar',
      btnCancel: 'Cancelar',
      status: 'warning'
    };
    const dialogRef = this.matDialog.open(FeedbackDescriptionModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '480px', maxWidth: '480px', maxHeight: '340px', minHeight: '308px'
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.disabledButtonFinalization = true;
        this.saveAgreementHeader();
      } else {
        this.disabledButtonFinalization = false;
      }
    });
  }

  public directFinalizationModal() {
    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'El acuerdo a pasado a estado finalizado',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 3000);
  }

  public noElectronicBillModal() {
    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'Debe adjuntar la factura electrónica antes de poder finalizar el acuerdo',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 3000);
  }

  exportToPdf(): void {
    var generatePDF = new AgreementProductInfoDetailModel();
    if (this.dataTableDetail.length != 0) {
      generatePDF.AgreementProductInfoDetailList = this.dataTableDetail;
      // Encabezado:
      generatePDF.Agreement_Type_Name = this.dataTableDetail[0].agreement_Type_Name;
      generatePDF.Name_Agree = this.nameAgree;
      generatePDF.Provider_Name = this.dataTableDetail[0].provider_Name;
      generatePDF.Date_Start = this.dataTableDetail[0].date_Start;
      generatePDF.Date_Finish = this.dataTableDetail[0].date_Finish;

      generatePDF.Email = this.dataTableDetail[0].email;
      generatePDF.String_Max_Amount = this.dataTableDetail[0].string_Max_Amount;
      generatePDF.String_Total_Recovery = this.dataTableDetail[0].string_Total_Recovery;
      generatePDF.String_Total_Recovery_Dollars = this.dataTableDetail[0].string_Total_Recovery_Dollars;
      generatePDF.Accounting_Account = this.dataTableDetail[0].accounting_Account;
      // generatePDF.Date_Finish = this.dataTableDetail[0].date_Finish;


    } else {
      generatePDF.AgreementProductInfoDetailList = [];
      generatePDF.Agreement_Type_Name = '';
      generatePDF.Name_Agree = this.nameAgree;
      generatePDF.Provider_Name = '';
      generatePDF.Date_Start = new Date();
      generatePDF.Date_Finish = new Date();

      generatePDF.Email = '';
      generatePDF.String_Max_Amount = '0';
      generatePDF.String_Total_Recovery = '0';
      generatePDF.String_Total_Recovery_Dollars = '0';
      generatePDF.Accounting_Account = '';
    }
    this.reportService.saveReport(generatePDF).subscribe(
      dataS => {
        var url = dataS;
        this.downloadFile(url, "Informe_General_Acuerdo" + "_" + this.nameAgree + ".pdf");
      },
      error => {
      }
    )
  }

  exportToExcel(){
    var generateExcel = new AgreementProductInfoDetailModel();
    if (this.dataTableDetail.length != 0) {
      generateExcel.AgreementProductInfoDetailList = this.dataTableDetail;
      generateExcel.Agreement_Type_Name = this.dataTableDetail[0].agreement_Type_Name;
      generateExcel.Name_Agree = this.nameAgree;
      generateExcel.Provider_Name = this.dataTableDetail[0].provider_Name;
      generateExcel.Date_Start = this.dataTableDetail[0].date_Start;
      generateExcel.Date_Finish = this.dataTableDetail[0].date_Finish;
    } else {
      generateExcel.AgreementProductInfoDetailList = [];
      generateExcel.Agreement_Type_Name = '';
      generateExcel.Name_Agree = this.nameAgree;
      generateExcel.Provider_Name = '';
      generateExcel.Date_Start = new Date();
      generateExcel.Date_Finish = new Date();
    }
    this.reportService.saveExcel(generateExcel).subscribe(
      dataS => {
        var url = dataS;
        this.downloadFile(url, "Informe_General_Acuerdo" + "_" + this.nameAgree + ".pdf");
      },
      error => {
      }
    )
  }

  downloadFile(url, archive) {
    try {
      var FileSaver = require('file-saver');
      FileSaver.saveAs(url, archive);

      this._common._setLoading(false);
    }
    catch
    {
      // const dataSuccess = {
      //   icon: 'warning',
      //   labelTitile: '¡Atención!',
      //   textDescription: 'No se puede descargar el archivo',
      //   // btnClose: 'Cerrar',
      //   status: 'warning'
      // };

      // const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      //   data: { contactInfo: dataSuccess },
      //   minWidth: '500px', maxWidth: '500px', maxHeight: '320px', minHeight: '320px'
      // });
      // setTimeout(() => dialogRef.close(), 2500);
      this._common._setLoading(false);
    }
  }

  tooltip(args: QueryCellInfoEventArgs) {
    if (args.column.field === "product_Name") {
      let tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString(),
        animation: {
          open: { effect: 'None', duration: 1000, delay: 200 },
          close: { effect: 'None', duration: 600, delay: 200 }
        }
      }, args.cell as HTMLTableCellElement);

    }
  }

  goListProductsResume() {
    this.enablePdfExport = false;
    this.showAgreementResumeTable = true;
    this.showAgreementResultTable = false;
    this.enableArrow = false;
    this.enableEntireAgreement = true;
    this.listAgreementDResume();

  }

  hasMaxAmount() {
    this.showAmountInput = (this.maxAmountToggle ? true : false);
  }

  openGoals() {
    let value = {
      pk_Ac_Trade_Agreement: this.headerFile,
      is_in_follow_up: true
    }

    const dialogRef = this.matDialog.open(GoalsLoaderComponent, {
      data: value,
      minWidth: '85vw', maxWidth: '85vw', maxHeight: '100vh', minHeight: '60vh'
    });

    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        const dataSuccess = {
          labelTitile: '¡Listo!',
          icon: 'check_box',
          textDescription: 'Se registraron las metas de manera correcta.',
          status: 'success'
        };

        const dialogRef = this.matDialog.open(FeedbackModalComponent, {
          data: { contactInfo: dataSuccess },
          minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
        });
        setTimeout(() => dialogRef.close(), 3000);
      }
    })

  }


  public currencyFormatter = (field: string, data1: object, column: object) => {
    if(data1['id_Currency'].toUpperCase() == 'COLONES'){
      return '₡' + data1['string_Product_Amount'];    
    }else{
      return '$' + data1['string_Product_Amount'];
    } 
  }


  public currencyFormatterCalculate = (field: string, data1: object, column: object) => {
    if(data1['id_Currency'].toUpperCase() == 'COLONES'){
      return '₡' + data1['string_Calculate_Recovery_Amount'];    
    }else{
      return '$' + data1['string_Calculate_Recovery_Amount'];
    } 
  }


}

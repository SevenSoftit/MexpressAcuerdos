import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { Column, GridComponent, GridLine } from '@syncfusion/ej2-angular-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MatDialog } from '@angular/material/dialog';
import { ImportProductComponent } from '../import-product/import-product.component';
import { MoneyModel } from 'src/app/models/money.model';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';
import { ProviderModel } from 'src/app/models/provider.model';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { utiles } from 'src/environments/utiles';
import { NewAgreementModel } from 'src/app/models/newAgreement.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { CatalogModel } from 'src/app/models/catalog.Model';
import { TradeAgreementDetailService } from 'src/app/shared/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AllMoneyService } from 'src/app/shared/services/allMoney/allMoney.service';
import { TypeOfAgreementService } from 'src/app/shared/services/typeOfAgreement/typeOfAgreement.service';
import { ProviderService } from 'src/app/shared/services/TaProvider/provider.service';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { ListEvidencesModalComponent } from 'src/app/shared/modal/list-evidences-modal/list-evidences-modal.component';
import { GoalsLoaderComponent } from 'src/app/shared/modal/goals-loader/goals-loader.component';
import { DatePipe } from '@angular/common';
import { Query } from '@syncfusion/ej2-data';



@Component({
  selector: 'app-new-trade-agreements-detail',
  templateUrl: './new-trade-agreements-detail.component.html',
  styleUrls: ['./new-trade-agreements-detail.component.scss']
})
export class NewTradeAgreementsDetailComponent implements OnInit {
  newAgreementForm: FormGroup;
  showErrors: boolean = false;
  errorDate: boolean = false;
  errorStartDate: boolean = false;
  errorEndDate: boolean = false;
  type_of_agreement: any;
  providerN: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  public dataTable: any[] = [];
  public workDataTable: any;
  public initialSort: Object;
  public pageSettings: Object;
  screenHeight: any;
  screenWidth: any;
  public lines: GridLine;
  public editSettings: Object;
  public editSettingsWork: Object;
  public toolbar: ToolbarItems[] | Object;
  public toolbarWork: ToolbarItems[] | Object;
  public codeRules: Object;
  public productNameRules: Object;
  public moneyRules: Object;
  public amountRules: Object;
  public moneyTypeParams: IEditCell;
  private typeContacElem: HTMLElement;
  private typeContactObj: DropDownList;
  listsMoney: { [key: string]: Object }[] = [];
  typeOfAgreementList: any;
  providerList: any = [];
  providerValue: any;
  docHasErrors = false;
  headerFile: number = 0;
  nameAgree: string = '';
  pkCatAgreementDetails: number = 0;
  public showWorkTable: boolean = false;
  title = 'Todos los acuerdos comerciales';
  public moneyModel: MoneyModel = new MoneyModel();
  public typeOfAgreementModel: TypeOfAgreementModel = new TypeOfAgreementModel();
  public providerModel: ProviderModel = new ProviderModel();
  agreement_activator: boolean = true;
  showGoals = false;
  allproducts_activator = false;
  pk_Ac_Trade_Agreement: number = 0;
  newAgreementDetailHeaderModel: NewAgreementDetailHeaderModel = new NewAgreementDetailHeaderModel();
  infoUser = utiles.getInfoUser();
  dateProcess: Date = new Date();
  dateReprocess: Date = new Date();
  onAdd = new EventEmitter();
  enableExcel: boolean = false;
  disableHeader: boolean = false;
  errorProvider: boolean = false;
  errorTypeOfAgreement: boolean = false;
  enableEvidence: boolean = false;
  listHeader: any = [];
  catalogModel: CatalogModel = new CatalogModel();
  search_key: string = 'agreement_status_in_process';
  fk_Status_Agreement: number = 0;
  enableUpdateAgreement: boolean = false;
  agreementDetail: any;
  fk_Glb_Mtr_Organization: number = 1;
  disableStartDate: boolean = false;
  isEditable: boolean = true;
  option = true;
  SearchInfo: any = [];
  heightGridLW: any;
  //#region InfiniteScrollVariables
  total = 0;
  data: any = [];
  limit = 7;
  offset = 0;
  options = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;
  pageNumber = 1;
  completeLoad = false;
  percentage:string='25%';
  //#endregion InfiniteScrollVariables
  public maxAmountToggle = false;
  public maxAmount: string = '0';
  public string_Total_Recovery: string = '0';
  public string_Total_Recovery_Dollars: string = '0';
  showAmountInput = false;
  emailNotification: string = '';
  submitted = false;
  yearStart: number = 0;
  yearEnd: number = 0;

  constructor(private datePipe: DatePipe, private tradeAgreementDetailService: TradeAgreementDetailService, public matDialog: MatDialog, private _common: CommonService,
    private allMoneyService: AllMoneyService, private typeOfAgreementService: TypeOfAgreementService,
    private providerService: ProviderService, private activated_route: ActivatedRoute) {

    this._common._setLoading(true);
    this.activated_route.queryParams.subscribe(params => {
      var parameters = params["agreementDet"];

      if (parameters != undefined) {
        this.agreementDetail = JSON.parse(parameters);
        if (this.agreementDetail.info.pk_Ac_Trade_Agreement !== null && this.agreementDetail.info.pk_Ac_Trade_Agreement !== undefined) {
          this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          var agreement = new NewAgreementModel();

          agreement.Pk_Ac_Trade_Agreement = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          this.nameAgree = this.agreementDetail.info.name_Agreement;
          this.providerModel.Name_Provider = this.agreementDetail.info.provider_Name;
          this.showGoals = this.agreementDetail.info.all_Products;
          
          if(this.agreementDetail.info.max_Amount !== 0){
              this.maxAmountToggle = true;
              this.showAmountInput = true;
          }
          this.listAgreement(agreement);
        }
      }
    });

    if (this.headerFile == 0) {
      this.disableHeader = false;
    } else {
      this.disableHeader = true;
    }
  }

  ngOnInit() {
    this._common._setLoading(true);
    this.getScreenSize();

    this.options$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        if(this.providerModel.Name_Provider === ''){
           return [...acc, ...curr];
        } else {
          return [...curr];
        }

      }, [])
    );

    this.newAgreementForm = new FormGroup({
      agreement_name: new FormControl('', [Validators.required]),
      startDatePicker: new FormControl(new Date()), //new Date(this.doo.getTime() - this.doo.getTimezoneOffset() * -60000)
      endDatePicker: new FormControl(new Date()),
      description: new FormControl(''),
      emailNotification: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      accountingAccount: new FormControl('')
    });
    this.lines = 'Both';
    this.initialSort = { columns: [{ field: 'product_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, newRowPosition: 'Top', mode: 'Normal', allowEditOnDblClick: true};
    this.editSettingsWork = { allowEditing: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Cancel', 'Search', { text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];
    this.toolbarWork = ['Edit', 'Delete', 'Cancel', 'Search'];

    this.codeRules = { required: [true, 'Código requerido'] };
    this.productNameRules = { required: [true, 'Nombre requerido'] };
    this.moneyRules = { required: [true, 'Moneda requerida'] };
    this.amountRules = { required: [true, 'Monto requerido'] };

    this.moneyTypeParams = {
      params: { popupHeight: '300px' },
      create: () => {
        this.typeContacElem = document.createElement("input");
        return this.typeContacElem;
      },
      read: () => {

        return this.typeContactObj.value;
      },
      destroy: () => {
        this.typeContactObj.destroy();
      },
      write: (args: { rowData: any; column: Column }) => {
        this.typeContactObj = new DropDownList({
          dataSource: this.listsMoney,

          fields: { value: "name_Currency", text: "name_Currency" },
          enabled: true,
          placeholder: "Seleccione la moneda",
          floatLabelType: "Never",
          allowFiltering: true,
          query: new Query(),
          actionComplete: () => false,
          value: args.rowData.name_Currency
        });
        this.typeContactObj.appendTo(this.typeContacElem);
        this.typeContactObj.dataBind();
      }
    };
  }

  fillFormAgreementDetail() {
    if (this.agreementDetail != undefined) {
      this.newAgreementForm.patchValue({
        agreement_name: this.agreementDetail.info.name_Agreement,
        description: this.agreementDetail.info.description_Agreement,
        startDatePicker: this.agreementDetail.info.date_Start,
        endDatePicker: this.agreementDetail.info.date_Finish,
        emailNotification: this.agreementDetail.info.email,
        accountingAccount: this.agreementDetail.info.accounting_Account

      });
      this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
      this.type_of_agreement = this.agreementDetail.info.pk_Cat_Type_Agreement;
      this.providerN = this.agreementDetail.info.pk_Ac_Cat_Provider;
      this.dateProcess = this.agreementDetail.info.date_Process;
      this.dateReprocess = this.agreementDetail.info.date_Reprocess;
      this.allproducts_activator = this.agreementDetail.info.all_Products;
      this.fk_Status_Agreement = this.agreementDetail.info.fk_Status_Agreement;
      this.agreement_activator = this.agreementDetail.info.active;
      this.fk_Glb_Mtr_Organization = this.agreementDetail.info.fk_Glb_Mtr_Organization;
      this.maxAmount= String(this.agreementDetail.info.max_Amount);
      this.string_Total_Recovery = String(this.agreementDetail.info.string_Total_Recovery);
      this.string_Total_Recovery_Dollars = String(this.agreementDetail.info.string_Total_Recovery_Dollars);
    } else {
      this.newAgreementForm.setValue({
        agreement_name: '',
        description: '',
        startDatePicker: new Date(),
        endDatePicker: new Date(),
        emailNotification: '',
        accountingAccount: ''
      });
    }
    this.getKeyStatus(); 
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth < 1536) {
      this.heightGridLW = 220;
    } else if (this.screenWidth >= 1536 && this.screenWidth < 1900 && this.screenWidth != 1680) {
      this.heightGridLW = 170;
    } 
    else if (this.screenWidth > 1900) {
      this.heightGridLW = 420;
    }
    else if (this.screenWidth == 1680) {
      this.heightGridLW = 230;
    }

    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 10, pageCount: 8 };
    } else {
      this.pageSettings = { pageSize: 5, pageCount: 8 };
    }
    this.listMoney();
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };


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

  saveAgreementHeader() {
    this.submitted = true;
    this._common._setLoading(true);
    if ((this.dataTable != undefined || this.workDataTable != undefined) && !this.showGoals) {
      this.grid.endEdit();
    }
    this.errorDate = false;
    this.errorStartDate = false;
    this.errorEndDate = false;
    this.errorProvider = false;
    this.errorTypeOfAgreement = false;
    // var today = new Date();
    // today.setHours(0, 0, 0, 0);
    // this.newAgreementForm.value.startDatePicker.setHours(0, 0, 0, 0);
    // this.newAgreementForm.value.endDatePicker.setHours(0, 0, 0, 0);

    // if (this.newAgreementForm.value.startDatePicker < today) {
    //   this.errorDate = true;
    //   this.errorStartDate = true;
    // }
   //Validación de fechas 
    if (this.datePipe.transform(this.newAgreementForm.value.startDatePicker, 'yyyy/MM/dd') > this.datePipe.transform(this.newAgreementForm.value.endDatePicker, 'yyyy/MM/dd')) {
      this.errorDate = true;
      this.errorEndDate = true;
    }

    if (this.providerN == undefined) {
      this.errorProvider = true;
    }     

    if (this.type_of_agreement == undefined) {
      this.errorTypeOfAgreement = true;    
    } 


    if (this.newAgreementForm.status != 'INVALID' && !this.errorDate && !this.errorProvider && !this.errorTypeOfAgreement) {
      var fechaInicial = new Date(this.datePipe.transform(this.newAgreementForm.value.startDatePicker, 'yyyy/MM/dd'));
      var fechaFinal = new Date(this.datePipe.transform(this.newAgreementForm.value.endDatePicker, 'yyyy/MM/dd'));
      this.newAgreementDetailHeaderModel.Pk_Ac_Trade_Agreement = this.headerFile;
      this.newAgreementDetailHeaderModel.Pk_Cat_Type_Agreement = this.type_of_agreement;
      this.newAgreementDetailHeaderModel.Pk_Ac_Cat_Provider = this.providerN;
      this.newAgreementDetailHeaderModel.Creation_User = this.infoUser.username;
      this.newAgreementDetailHeaderModel.Modification_User = this.infoUser.username;
      this.newAgreementDetailHeaderModel.Name_Agreement = this.newAgreementForm.value.agreement_name;
      this.newAgreementDetailHeaderModel.Description_Agreement = this.newAgreementForm.value.description;
      this.newAgreementDetailHeaderModel.Date_Start = fechaInicial;
      this.newAgreementDetailHeaderModel.Date_Finish = fechaFinal;
      this.newAgreementDetailHeaderModel.Date_Process = this.dateProcess;
      this.newAgreementDetailHeaderModel.Date_Reprocess = this.dateReprocess;
      this.newAgreementDetailHeaderModel.All_Products = this.allproducts_activator;
      this.newAgreementDetailHeaderModel.Provider_Name = '';
      this.newAgreementDetailHeaderModel.Fk_Status_Agreement = this.fk_Status_Agreement;
      this.newAgreementDetailHeaderModel.Active = this.agreement_activator;
      this.newAgreementDetailHeaderModel.Fk_Glb_Mtr_Organization = this.fk_Glb_Mtr_Organization;
      this.newAgreementDetailHeaderModel.Max_Amount = Number(this.maxAmount!== null && this.maxAmount !== '0.00') ? Number(this.maxAmount) : 0;
      this.newAgreementDetailHeaderModel.Email = this.newAgreementForm.value.emailNotification;
      this.newAgreementDetailHeaderModel.Conciliation_User = '';
      this.newAgreementDetailHeaderModel.Conciliation_Date = new Date();
      this.newAgreementDetailHeaderModel.Accounting_Account = this.newAgreementForm.value.accountingAccount;

      this.tradeAgreementDetailService.saveAgreementHeader(this.newAgreementDetailHeaderModel).subscribe(
        data => {
          var agreementRefresh = new NewAgreementModel();
          agreementRefresh.Pk_Ac_Trade_Agreement = this.headerFile;
          this.listAgreement(agreementRefresh);
          const datafailed = {
            labelTitile: '¡Atención!',
            icon: 'new_releases',
            textDescription: 'La información se guardó correctamente.',
            status: 'success'
          };

          this._common._setLoading(false);
          if (!this.enableUpdateAgreement) {
            this.enableExcel = true;
            this.enableEvidence = true;
            this.disableHeader = true;
            this.headerFile = data[0].pk_Ac_Trade_Agreement;
            this.workDataTable = [];
            this.dataTable = [];
            this.nameAgree = data[0].name_Agreement;
            this.showErrors = false;
            this.showWorkTable = false;
            this.enableUpdateAgreement = true;
            this.onAdd.emit(true);
          } else {
            this.enableExcel = true;
            this.enableEvidence = true;
            this.disableHeader = true;
            this.headerFile = data[0].pk_Ac_Trade_Agreement;
            this.workDataTable = [];
            this.nameAgree = data[0].name_Agreement;
            this.showErrors = false;
            this.showWorkTable = false;
            this.onAdd.emit(true);

          }

          const dialogRef = this.matDialog.open(FeedbackModalComponent, {
            data: { contactInfo: datafailed },
            minWidth: '500px', maxWidth: '500px', maxHeight: '250px', minHeight: '250px'
          });
        setTimeout(() => dialogRef.close(), 3000);

        },
        () => {

        });

    }
    else
      this.showErrors = true;
    this._common._setLoading(false);
  }
  dateChange() {
    // startDate.setHours(0);
    // endDate.setHours(0);

    // var diff = this.newAgreementForm.value.endDatePicker.getTime() - this.newAgreementForm.value.startDatePicker.getTime();

    // var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    // if (diffDays < 0)
    //   diffDays = 0;
    // else if (diffDays == 0)
    //   diffDays = 1;

    // this.newAgreementForm.patchValue({
    //   workedDays: diffDays + 1
    // });
  }

  actionBegin(args: any): void {
    let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
    if (args.requestType === 'save') {
      if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
      }

      if (args.action == "add" || args.action == "edit") {
        this.saveWorkLine(args.data);
      }
    }
    else if (args.requestType === 'delete') {
      this.deleteWorkLine(args.data);
    }
    else if (args.requestType === 'beginedit') {
      gridInstance.ej
    }
  }

  /***********************************************************************************
* Author: Gustavo ZC
* Creation date: 30/07/2019
* Description: 
* ***********************************************************************************/

  saveWorkLine(data) {
    data.pk_Cat_Agreement_Details = (data.pk_Cat_Agreement_Details != undefined && !Number.isNaN(data.pk_Cat_Agreement_Details)) ? data.pk_Cat_Agreement_Details : 0;
    data.pk_Ac_Trade_Agreement = (data.pk_Ac_Trade_Agreement != undefined && !Number.isNaN(data.pk_Ac_Trade_Agreement)) ? data.pk_Ac_Trade_Agreement : this.headerFile;
    data.pk_Glb_Products = (data.pk_Glb_Products != undefined && data.pk_Glb_Products != 0 && !Number.isNaN(data.pk_Glb_Products)) ? data.pk_Glb_Products : 1;
    data.product_Id_Alias = data.product_Id_Alias;
    data.product_Name = data.product_Name;
    // data.id_Currency = this.listsMoney.filter(x => x.name_Currency == data.name_Currency)[0].id_Currency;
    data.id_Currency = data.name_Currency;
    data.recovery_Amount = data.recovery_Amount;
    data.active = (data.active != undefined && !Number.isNaN(data.active)) ? data.active : true;
    data.creation_User = this.infoUser.username;
    data.modification_User = this.infoUser.username;

    this.tradeAgreementDetailService.saveTradeAgreementDetail(data).subscribe(
      dataZ => {
        data.pk_Cat_Agreement_Details = dataZ.pk_Cat_Agreement_Details;


      }, () => {
        this.dataTable = this.dataTable.filter(dt => dt.pk_Cat_Agreement_Details != 0);
        var agreement = new NewAgreementModel();
        agreement.Pk_Ac_Trade_Agreement = this.headerFile;
        this.listAgreement(agreement);
      });
  }

  /***********************************************************************************
 * Author: Gustavo ZC
 * Creation date: 30/07/2019
 * Description: This method delete an object to a control list
 * ***********************************************************************************/

  deleteWorkLine(data: NewAgreementModel) {
    data[0].pk_Cat_Agreement_Details = (data[0].pk_Cat_Agreement_Details != undefined && !Number.isNaN(data[0].pk_Cat_Agreement_Details)) ? data[0].pk_Cat_Agreement_Details : 0;
    this.tradeAgreementDetailService.deleteTradeAgreementDetailProduct(data[0]).subscribe(
      () => {
        // data.pk_Cat_Agreement_Details = dataG.pk_Cat_Agreement_Details;
      }, error => {
        this._common._setLoading(false);
        console.log(error);
      });
  }

  actionBeginWork(args: any): void {
    let gridInstance: any = (<any>document.getElementById('NormalgridWork')).ej2_instances[0];
    if (args.requestType === 'save') {
      if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
      }

      if (args.action == "add" || args.action == "edit") {

        this.updateWorkProduct(args, false);
      }
    }
    else if (args.requestType === 'delete') {
      this.updateWorkProduct(args, true);
    }
    else if (args.requestType === 'beginedit') {
      gridInstance.ej
    }
  }

  updateWorkProduct(args: any, isDelete) {

    var object: any;

    if (!isDelete) {
      args.data.product_Id_Alias = (args.data.product_Id_Alias != undefined) ? args.data.product_Id_Alias : '';
      args.data.product_Name = (args.data.product_Name != undefined) ? args.data.product_Name : '';
      args.data.id_Currency = (args.data.id_Currency != undefined) ? args.data.id_Currency : '';
      // args.data.id_Currency = this.listsMoney.filter(x => x.name_Currency == args.data.name_Currency)[0].id_Currency;
      args.data.product_Amount = (args.data.product_Amount != undefined) ? args.data.product_Amount : 0;
      args.data.creation_User = this.infoUser.username;
      args.data.pk_Ac_Trade_Agreement = (args.data.pk_Ac_Trade_Agreement != undefined && !Number.isNaN(args.data.pk_Ac_Trade_Agreement)) ? args.data.pk_Ac_Trade_Agreement : 0;
      args.data.pk_Gbl_Wrk_Agreement = (args.data.pk_Gbl_Wrk_Agreement != undefined && !Number.isNaN(args.data.pk_Gbl_Wrk_Agreement)) ? args.data.pk_Gbl_Wrk_Agreement : 0;
      args.data.error = (args.data.error != undefined && !Number.isNaN(args.data.error)) ? args.data.error : args.data.error;
      args.data.message_Error = (args.data.message_Error != undefined) ? args.data.message_Error : '';
      args.data.it_Processed = (args.data.it_Processed != undefined && !Number.isNaN(args.data.it_Processed)) ? args.data.it_Processed : args.data.it_Processed;
      args.data.invalid_Amount = (args.data.invalid_Amount != undefined && !Number.isNaN(args.data.invalid_Amount)) ? args.data.invalid_Amount : args.data.invalid_Amount;
      args.data.not_Exist_Product = (args.data.not_Exist_Product != undefined && !Number.isNaN(args.data.not_Exist_Product)) ? args.data.not_Exist_Product : args.data.not_Exist_Product;
      args.data.duplicate_Product_Alias = (args.data.duplicate_Product_Alias != undefined && !Number.isNaN(args.data.duplicate_Product_Alias)) ? args.data.duplicate_Product_Alias : args.data.duplicate_Product_Alias;
      args.data.not_Exist_Id_Currency = (args.data.not_Exist_Id_Currency != undefined && !Number.isNaN(args.data.not_Exist_Id_Currency)) ? args.data.not_Exist_Id_Currency : args.data.not_Exist_Id_Currency;

      object = args.data;
      object.active = true;
    }
    else {
      object = args.data[0];
      object.active = false;
    }

    this.tradeAgreementDetailService.validateTradeAgreementDetailProductError(object).subscribe(
      dataW => {
        if (!isDelete) {
          if (dataW[0].error !== true) {
            args.row.style.backgroundColor = "#FFF";
            args.data.error = false;
            var obj = this.workDataTable.filter(val => val.pk_Gbl_Wrk_Agreement == args.data.pk_Gbl_Wrk_Agreement);
            obj[0].error = false;
            this.docHasErrors = false;
          }
        }


      }, () => {
        this._common._setLoading(false);
      });
  }

  //Pinta los campos erroneos en rojo
  rowDataBoundWork(args: any): void {
    if (args.data.error == true) {

      args.row.style.backgroundColor = "#F3C3C3";
      this.docHasErrors = true;
    }
    this.headerFile = args.data.pk_Ac_Trade_Agreement;
  }


  behaviorTypeOfAgreement(value: any) {
    this.errorTypeOfAgreement = false;
    if (value.value == 3) {
      this.disableStartDate = true;
      this.modalSelectedTypeAgreement();
    } else {
      this.disableStartDate = false;
    }
  }

  behaviorProvider(value: any) {
    this.errorProvider = false;
    // var filterProviderName: any = this.providerList.filter(obj => obj.pk_Ac_Cat_Provider == value.value);
    // filterProviderName.forEach(element => {
    //   // this.providerName = element.name_Provider
    // });
  }

  openDialogImportProduct(): void {
    const dialogRef = this.matDialog.open(ImportProductComponent, {
      data: { confirmInfo: this.headerFile },
      minWidth: '750px', maxWidth: '750px', minHeight: '245px', maxHeight: '245px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result != undefined) {
          this.docHasErrors = false;
          this.workDataTable = [];
          this.workDataTable = result;
          this.showWorkTable = true;
          this.title = 'Registros importados del Excel';
          // this.enableExcel = false;
          this.disableHeader = true;
          this.enableUpdateAgreement = false;
        }
      }
    );
  }

  processProductWork(updateRows) {
    if ((this.dataTable != undefined || this.workDataTable != undefined) && !this.showGoals) {
      this.grid.endEdit();
    }
    var object = {
      Pk_Ac_Trade_Agreement: this.headerFile,
      Update_Rows: updateRows
    };
    this.tradeAgreementDetailService.processWorkProductDetailTable(object).subscribe(
      dataW => {
        var agreement = new NewAgreementModel();
        if (dataW.length !== 0) {
          agreement.Pk_Ac_Trade_Agreement = dataW[0].pk_Ac_Trade_Agreement;
        } else {
          agreement.Pk_Ac_Trade_Agreement = 0;
        }
        this.saveAgreementHeader();
        this.listAgreement(agreement);
        this.showWorkTable = false;
        this.title = 'Todos los productos';
        const dataSuccess = {
          labelTitile: '¡Listo!',
          icon: 'check_box',
          textDescription: 'Se procesaron los registros de manera correcta.',
          status: 'success'
        };

        const dialogRef = this.matDialog.open(FeedbackModalComponent, {
          data: { contactInfo: dataSuccess },
          minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
        });
        setTimeout(() => dialogRef.close(), 3000);
      }, () => {
        this._common._setLoading(false);
      });
  }

  /*******************************************************
* Author: Gustavo ZC
* Creation date:  08/07/2019
* Description: method that list all types of moneys
****************************************************
* Modifications
****************************************************
* Number:
* Date:
* Ticket:
* Author:
* Description:
*******************************************************/
  listMoney() {

    this.allMoneyService.listMoney(this.moneyModel).subscribe(
      dataS => {
        const that = this;
        dataS.forEach(function (item) {
          that.listsMoney.push({
            id_Currency: item.id_Currency,
            name_Currency: item.name_Currency
          });
        });
        this.listTypeOfAgreement();
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }

  listTypeOfAgreement() {

    this.typeOfAgreementService.listTypeOfAgreement(this.typeOfAgreementModel).subscribe(
      dataS => {
        this.typeOfAgreementList = dataS;
        this.fillFormAgreementDetail();    
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
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

      if(option == true && this.providerModel.Name_Provider !== ""){
        this.providerList.forEach(element => {
          this.SearchInfo.push(element)
         });
        this.options.next(this.SearchInfo);
        this._common._setLoading(false);
       } 
       
       else if (option == false){
        this.providerList.forEach(element => {
          this.SearchInfo.push(element)
         });
        this.options.next(this.SearchInfo);
        this._common._setLoading(false);
       } 
       
       else if(option == true && this.providerModel.Name_Provider === ""){
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


  /*******************************************************
  * Author: esalas
  * Creation date:  16/08/2019
  * Description: method that helps infinite scroll to show more info
  ****************************************************/
  getNextBatch() {

    this.option = true;
    this.offset += this.limit; // variable that will set the end of infinite scroll when reach the total_rows
    this.pageNumber++; // variable for pagination
    
    if(this.pageNumber <= this.total){
      this.listProvider(this.option);
    }
  }
/*******************************************************
* Author: esalas
* Creation date:  16/08/2019
* Description: method that search an specific provider
****************************************************/
  providerSearch(event){

    this.SearchInfo = [];
    this.providerModel.Name_Provider = event.target.value;
    this.pageNumber = 1;
    this.option = false;
    this.listProvider(this.option);
  }
  // Opcion para Excel
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id == "export") {
      var date = new Date().toISOString().slice(0, 10);
      var archiveName = 'Reporte_De_Productos_' + date + '.xlsx'

      const excelExportProperties: ExcelExportProperties = {
        fileName: archiveName
      };

      this.grid.excelExport(excelExportProperties);
    }
  }

  /*******************************************************
* Author: Gustavo ZC
* Creation date:  19/07/2019
* Description: method that list the products of the agreement 
****************************************************
* Modifications
****************************************************
* Number:
* Date:
* Ticket:
* Author:
* Description:
*******************************************************/
  listAgreement(data: NewAgreementModel) {
    this.tradeAgreementDetailService.ListTradeAgreementDetail(data).subscribe(
      dataQ => {
        if ((dataQ.length == 0 || dataQ.length != 0) && dataQ != undefined) {
          this.enableExcel = true;
          this.enableEvidence = true;
        }
        this.dataTable = [];
        this.dataTable = dataQ;
        this.enableUpdateAgreement = true
        // this.grid.refresh();
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }

  cancel(): void {
    this.title = 'Todos los productos';
    this.showWorkTable = false;
    this.workDataTable = [];
    var pkH = new NewAgreementModel();
    pkH.Pk_Ac_Trade_Agreement = this.headerFile;
    this.listAgreement(pkH);
  }

  openListEvidenceModal() {
    if(!this.showGoals){
      this.grid.endEdit();
    }
    const object = {
      header_File: this.headerFile,
      name_Agree: this.nameAgree
    }
    const dialogRef = this.matDialog.open(ListEvidencesModalComponent, {
      data: { confirmInfo: object },
      minWidth: "900px",
      maxWidth: "950px"
    });
  }

  public modalSelectedTypeAgreement() {

    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'Se seleccionará el inventario del último día del rango seleccionado',
      // btnClose: 'Cerrar',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 3000);
  }

  allProductsChange() {
    const datafailed = {
      labelTitile: '¡Atención!',
      icon: 'new_releases',
      textDescription: 'No olvides de actualizar el acuerdo para guardar los cambios realizados.',
      status: 'warning'
    };
    this.showGoals = (this.allproducts_activator ? true : false);
  
    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: datafailed },
      minWidth: '500px', maxWidth: '500px', maxHeight: '250px', minHeight: '250px'
    });
  setTimeout(() => dialogRef.close(), 3000);
  }

  openGoals() {
    let value = {
      pk_Ac_Trade_Agreement: this.headerFile,
      is_in_follow_up: false
    }

    const dialogRef = this.matDialog.open(GoalsLoaderComponent, {
      data: value,
      minWidth: '85vw', maxWidth: '85vw', maxHeight: '100vh', minHeight: '60vh'
    });

    dialogRef.afterClosed().subscribe( (data) => { 

      if(data)
      {   
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
    } )
    
  }

  hasMaxAmount(){
    this.showAmountInput = (this.maxAmountToggle?true:false);
  }



public currencyFormatter = (field: string, data1: object, column: object) => {
  if(data1['name_Currency'] == 'COLONES'){
    return '₡' + data1['recovery_Amount'];
  }else{
    return '$' + data1['recovery_Amount'];

  } 
}

public currencyFormatterWork = (field: string, data1: object, column: object) => {
  if(data1['id_Currency'].toUpperCase() == 'COLONES'){
    return '₡' + data1['product_Amount'];
  }else{
    return '$' + data1['product_Amount'];
  } 
}

}

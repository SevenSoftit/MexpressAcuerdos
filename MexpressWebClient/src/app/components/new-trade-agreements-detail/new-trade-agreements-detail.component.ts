import { Component, OnInit, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MatDialog } from '@angular/material/dialog';
import { ImportProductComponent } from '../import-product/import-product.component';
import { CommonService } from 'src/app/services/common/common.service';
import { MoneyModel } from 'src/app/models/money.model';
import { AllMoneyService } from 'src/app/services/allMoney/allMoney.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';
import { TypeOfAgreementService } from 'src/app/services/typeOfAgreement/typeOfAgreement.service';
import { ProviderService } from 'src/app/services/TaProvider/provider.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { utiles } from 'src/environments/utiles';
import { NewAgreementModel } from 'src/app/models/newAgreement.model';
import * as $ from 'jquery';
import { AddAgreementEvidenceModalComponent } from '../add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { CatalogModel } from '../common-model/catalog.Model';

   

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
  provider: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  public dataTable: any;
  public workDataTable: any;
  public initialSort: Object;
  public pageSettings: Object;
  screenHeight: any;
  screenWidth: any;
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
  title = 'Todos los empleados';
  public moneyModel: MoneyModel = new MoneyModel();
  public typeOfAgreementModel: TypeOfAgreementModel = new TypeOfAgreementModel();
  public providerModel: ProviderModel = new ProviderModel();
  agreement_activator: boolean = false;
  pk_Ac_Trade_Agreement: number = 0;
  newAgreementDetailHeaderModel: NewAgreementDetailHeaderModel = new NewAgreementDetailHeaderModel();
  infoUser = utiles.getInfoUser();
  allProducts: boolean = false;
  dateProcess: Date = new Date();
  dateReprocess: Date = new Date();
  onAdd = new EventEmitter();
  providerName;
  enableExcel: boolean = false;
  disableHeader: boolean = false;
  errorProvider: boolean = false;
  errorTypeOfAgreement: boolean = false;
  enableEvidence: boolean = false;
  listHeader: any = [];
  catalogModel: CatalogModel = new CatalogModel();
  search_key: string = 'agreement_status_in_process';

  constructor(private tradeAgreementDetailService: TradeAgreementDetailService, public matDialog: MatDialog, private _common: CommonService,
    private allMoneyService: AllMoneyService, private typeOfAgreementService: TypeOfAgreementService,
    private providerService: ProviderService) {
       
     }

  ngOnInit() {

    this.newAgreementForm = new FormGroup({
      agreement_name: new FormControl('', [Validators.required]),
      startDatePicker: new FormControl(new Date()),
      endDatePicker: new FormControl(new Date()),
      description: new FormControl('')
    });

    this.initialSort = { columns: [{ field: 'product_Name', direction: 'Ascending' }] };
    this.pageSettings = { pageSize: 8, pageCount: 5 };
    this.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    this.editSettingsWork = { allowEditing: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Cancel', 'Search', { text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];
    this.toolbarWork = ['Edit', 'Delete', 'Cancel', 'Search'];

    this.codeRules = { required: [true, 'Código requerido'] };
    this.productNameRules = { required: [true, 'Nombre requerido'] };
    this.moneyRules = { required: [true, 'Moneda requerida'] };
    this.amountRules = { required: [true, 'Monto requerido'] };

    this.listMoney();


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
      write: () => {
        this.typeContactObj = new DropDownList({
          dataSource: this.listsMoney,

          fields: { value: "id_Currency", text: "name_Currency" },
          enabled: true,
          placeholder: "Seleccione la moneda",
          floatLabelType: "Never"
        });
        this.typeContactObj.appendTo(this.typeContacElem);
        this.typeContactObj.dataBind();
      }
    };

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 10, pageCount: 5 };
    } else {
      this.pageSettings = { pageSize: 7, pageCount: 5 };
    }
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };


  saveAgreementHeader() {
    this.errorDate = false;
    this.errorStartDate = false;
    this.errorEndDate = false;

    this.catalogModel.Search_Key = this.search_key;
    this._common.listCatalog(this.catalogModel).subscribe(
      dataF => {
        debugger;
        this.newAgreementDetailHeaderModel.Fk_Status_Agreement = dataF[0].pk_Glb_Cat_Catalog;         
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
        
  
      });

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    this.newAgreementForm.value.startDatePicker.setHours(0, 0, 0, 0);
    this.newAgreementForm.value.endDatePicker.setHours(0, 0, 0, 0);

    if (this.newAgreementForm.value.startDatePicker < today) {
      this.errorDate = true;
      this.errorStartDate = true;
    }
    if (this.newAgreementForm.value.startDatePicker > this.newAgreementForm.value.endDatePicker) {
      this.errorDate = true;
      this.errorEndDate = true;
    }

    if(this.provider == undefined){
        this.errorProvider = true;
    }

    if(this.type_of_agreement == undefined){
      this.errorTypeOfAgreement = true;
  }

    if (this.newAgreementForm.status != 'INVALID' && !this.errorDate && !this.errorProvider && !this.errorTypeOfAgreement) {
      this.newAgreementDetailHeaderModel.Pk_Ac_Trade_Agreement = this.pk_Ac_Trade_Agreement;
      this.newAgreementDetailHeaderModel.Pk_Cat_Type_Agreement = this.type_of_agreement;
      this.newAgreementDetailHeaderModel.Pk_Ac_Cat_Provider = this.provider;
      this.newAgreementDetailHeaderModel.Creation_User = this.infoUser.username;
      this.newAgreementDetailHeaderModel.Modification_User = this.infoUser.username;

      this.newAgreementDetailHeaderModel.Name_Agreement = this.newAgreementForm.value.agreement_name;
      this.newAgreementDetailHeaderModel.Description_Agreement = this.newAgreementForm.value.description;
      this.newAgreementDetailHeaderModel.Date_Start = this.newAgreementForm.value.startDatePicker;
      this.newAgreementDetailHeaderModel.Date_Finish = this.newAgreementForm.value.endDatePicker;
      this.newAgreementDetailHeaderModel.Date_Process = this.dateProcess;
      this.newAgreementDetailHeaderModel.Date_Reprocess = this.dateReprocess;
      this.newAgreementDetailHeaderModel.All_Products = this.allProducts;
      this.newAgreementDetailHeaderModel.Provider_Name = this.providerName;
      this.newAgreementDetailHeaderModel.Active = this.agreement_activator;
      this.newAgreementDetailHeaderModel.Fk_Glb_Mtr_Organization = 1;

      this.tradeAgreementDetailService.saveAgreementHeader(this.newAgreementDetailHeaderModel).subscribe(
        data => {
          this.enableExcel = true;
          this.enableEvidence = true;
          this.disableHeader = true;
          this.headerFile = data[0].pk_Ac_Trade_Agreement;
          this.workDataTable = [];
          this.dataTable = [];
          debugger;
          this.nameAgree = data[0].name_Agreement;
          //this.modalSuccessConcept();

          // this.newAgreementForm.setValue({
          //   agreement_name: '',
          //   description: '',
          //   startDatePicker: new Date(),
          //   endDatePicker: new Date()
          // });

          this.showErrors = false;
          this.onAdd.emit(true);
        },
        () => {

        });

    }
    else
      this.showErrors = true;
  }
  dateChange() {
    var startDate = this.newAgreementForm.value.startDatePicker;
    var endDate = this.newAgreementForm.value.endDatePicker;
    startDate.setHours(0);
    endDate.setHours(0);

    var diff = this.newAgreementForm.value.endDatePicker.getTime() - this.newAgreementForm.value.startDatePicker.getTime();

    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDays < 0)
      diffDays = 0;
    else if (diffDays == 0)
      diffDays = 1;

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

      if (args.action == "add" || args.action == "edit"){
        //this.saveWorkLine(args.data);
      }
    }
    else if (args.requestType === 'delete') {
      //this.deleteWorkLine(args.data);
    }
    else if (args.requestType === 'beginedit') {
      gridInstance.ej
    }
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
            var obj = this.workDataTable.filter(val=> val.pk_Gbl_Wrk_Agreement == args.data.pk_Gbl_Wrk_Agreement);
            obj[0].error = false;
            this.docHasErrors = false;                
          }
        }


      }, error => {
        this._common._setLoading(false);
       });
  }

  //Pinta los campos erroneos en rojo
  rowDataBound(args: any): void {
    if (args.data.error == true) {

      args.row.style.backgroundColor = "#F3C3C3";
      this.docHasErrors = true;
    }
    this.headerFile = args.data.pk_Ac_Trade_Agreement;
    this.grid.gridLines = 'Both';
  }

  dataBound(args: any) {
      this.grid.gridLines = 'Both';
    }


  behaviorTypeOfAgreement() {
    this.errorTypeOfAgreement = false;
  }

  behaviorProvider(value: any) {
    this.errorProvider = false;
    var filterProviderName: any = this.providerList.filter(obj => obj.pk_Ac_Cat_Provider == value.value);
    filterProviderName.forEach(element => {
      this.providerName = element.name_Provider
    });
  }

  uploadArchive() {
  }

  openDialogImportProduct(): void {

    const dialogRef = this.matDialog.open(ImportProductComponent, { 
      data: { confirmInfo: this.headerFile },
      minWidth: '564px', maxWidth: '564px', minHeight: '406px', maxHeight: '420px' });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result != undefined) {
          this.workDataTable = [];
          this.workDataTable = result;
          this.showWorkTable = true;
          this.title = 'Registros importados del Excel';
          // this.enableExcel = false;
          this.disableHeader = false;
        }
      }
    );
  }

  processProductWork(updateRows) {
    var object = { 
      Pk_Ac_Trade_Agreement: this.headerFile,
      Update_Rows: updateRows
    };

    this.tradeAgreementDetailService.processWorkProductDetailTable(object).subscribe(
      dataW => {
        var agreement = new NewAgreementModel();
        if(dataW.length !== 0){
          agreement.Pk_Ac_Trade_Agreement = dataW[0].pk_Ac_Trade_Agreement;
        }else{
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
      }, error => {
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
        this._common._setLoading(false);
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
        this.listProvider();
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
  }

  listProvider() {
    this.providerService.listProvider(this.providerModel).subscribe(
      dataG => {
        this.providerList = dataG;
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
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
  debugger;
  this.tradeAgreementDetailService.ListTradeAgreementDetail(data).subscribe(
    dataQ => {
      debugger;
      this.dataTable = dataQ;
      this._common._setLoading(false);
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

  downloadFile() {
    $("#dowloadFile").prop("href", "assets/download/Plantilla de carga de productos.xlsx");
  }

  // PRUEBA TEMPORAL
  openAddEvidenceModal(){
    const object ={
      header_File: this.headerFile,
      name_Agree: this.nameAgree
     }
    const dialogRef = this.matDialog.open(AddAgreementEvidenceModalComponent, {
      data: {confirmInfo: object},
      minWidth: "900px",
      maxWidth: "950px",
      maxHeight: "600px",
      minHeight: "475px"
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        //this.listAllEvidences();
      }
    });
  }

}

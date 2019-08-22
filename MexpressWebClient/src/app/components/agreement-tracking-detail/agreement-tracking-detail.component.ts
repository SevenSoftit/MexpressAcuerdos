
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/TaProvider/provider.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { CommonService } from 'src/app/services/common/common.service';
import { TypeOfAgreementService } from 'src/app/services/typeOfAgreement/typeOfAgreement.service';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';
import { AgreementProductInfoModel } from 'src/app/models/agreementProductInfo.model';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { AgreementProductInfoDetailModel } from 'src/app/models/agreementProductInfoDetail.model';
import { Tooltip } from '@syncfusion/ej2-popups';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { GoalsLoaderComponent } from '../goals-loader/goals-loader.component';

@Component({
  selector: 'app-agreement-tracking-detail',
  templateUrl: './agreement-tracking-detail.component.html',
  styleUrls: ['./agreement-tracking-detail.component.scss']
})
export class AgreementTrackingDetailComponent implements OnInit {
  newAgreementForm: FormGroup;
  type_of_agreement: any;
  provider: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  public dataTable: any;
  public initialSort: Object;
  public pageSettings: Object;
  screenHeight: any;
  screenWidth: any;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | Object;
  headerFile: number = 0;
  title = 'Todos los acuerdos comerciales';
  agreement_activator: boolean = false;
  showGoals = false;
  allproducts_activator = false;
  dateProcess: Date = new Date();
  dateReprocess: Date = new Date();
  providerName;
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
    providerFilter = "";
    maxAmountToggle = false;
    maxAmount: number = 0;
    showAmountInput = false;
    percentage:string='25%'
    //#endregion InfiniteScrollVariables

 
  constructor(public matDialog: MatDialog, private activated_route: ActivatedRoute, private providerService: ProviderService, private _common: CommonService,  private typeOfAgreementService: TypeOfAgreementService,
    private tradeAgreementDetailService: TradeAgreementDetailService) {
      
      this.activated_route.queryParams.subscribe(params => {     
        var parameters = params["agreementDet"];

       if(parameters != undefined){
        this.agreementDetail = JSON.parse(parameters);
        if (this.agreementDetail.info.pk_Ac_Trade_Agreement !== null && this.agreementDetail.info.pk_Ac_Trade_Agreement !== undefined) {
          this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          this.behaviorTA = this.agreementDetail.info.behavior;
          this.showGoals = this.agreementDetail.info.all_Products;
        }
      }
      });    
  }

  ngOnInit() {
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
      startDatePicker: new FormControl(new Date()),
      endDatePicker: new FormControl(new Date()),
      description: new FormControl('')
    });

    // this.initialSort = { columns: [{ field: 'product_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Cancel', 'Search', { text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];

    this.fillFormAgreementDetail();
    this.listProvider(this.option);
    this.listTypeOfAgreement();
  }
  fillFormAgreementDetail() {
    if(this.agreementDetail != undefined){
      this.newAgreementForm.patchValue({
        agreement_name: this.agreementDetail.info.name_Agreement,
        description: this.agreementDetail.info.description_Agreement,
        startDatePicker: new Date(this.agreementDetail.info.date_Start),
        endDatePicker: new Date(this.agreementDetail.info.date_Finish),

      });
      this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
      this.type_of_agreement = this.agreementDetail.info.pk_Cat_Type_Agreement;
      this.provider = this.agreementDetail.info.pk_Ac_Cat_Provider;
      this.dateProcess = this.agreementDetail.info.date_Process;
      this.dateReprocess = this.agreementDetail.info.date_Reprocess;
      this.allproducts_activator = this.agreementDetail.info.all_Products;
      this.providerName = this.agreementDetail.info.provider_Name;
      this.fk_Status_Agreement = this.agreementDetail.info.fk_Status_Agreement;
      this.agreement_activator = this.agreementDetail.info.active;
      this.fk_Glb_Mtr_Organization = this.agreementDetail.info.fk_Glb_Mtr_Organization;
    }else{
      this.newAgreementForm.setValue({
        agreement_name: '',
        description: '',
        startDatePicker: new Date(),
        endDatePicker: new Date(),
      });

    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth < 1536) {
      this.heightGridLW = 220;
    } else if (this.screenWidth >= 1536 && this.screenWidth < 1900 && this.screenWidth != 1680) {
      this.heightGridLW = 213;
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



  dataBound() {
    this.grid.gridLines = 'Both';
 
    // if (this.grid.columns.length > 9) {
    //   this.grid.autoFitColumns();
    // }
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

  listTypeOfAgreement() {
    this._common._setLoading(true);
    this.typeOfAgreementService.listTypeOfAgreement(this.typeOfAgreementModel).subscribe(
      dataS => {
        this.typeOfAgreementList = dataS;
        this.listAgreementDResume();
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
  * Author: Gustavo ZC
  * Creation date:  22/08/2019
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

  listAgreementDResume() {
    var agreementProductInfoModel = new AgreementProductInfoModel();
    agreementProductInfoModel.Pk_Ac_Trade_Agreement = this.headerFile;
    agreementProductInfoModel.Behavior = this.behaviorTA;
    this.tradeAgreementDetailService.listAgreementDetailsResume(agreementProductInfoModel).subscribe(
      dataI => {
        this.dataTable = dataI;
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
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
        this.dataTable = dataJ;
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

  seeDetailOfTheEntireAgreement(): void {  
    var agreementProductInfoDetailModel = new AgreementProductInfoDetailModel();
    agreementProductInfoDetailModel.Pk_Ac_Trade_Agreement = this.headerFile;
    agreementProductInfoDetailModel.Behavior = this.behaviorTA;
    agreementProductInfoDetailModel.Product_Id = '';

    this.tradeAgreementDetailService.viewAgreementProductDetails(agreementProductInfoDetailModel).subscribe(
      dataS => {
        this.enableEntireAgreement = false;
        this.enableArrow = true;
        this.dataTable = dataS;
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

  tooltip(args: QueryCellInfoEventArgs) {
    if(args.column.field === "product_Name")  {
    let tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString(),
        animation: {
          open: { effect: 'None', duration: 1000, delay: 200 },
          close: { effect: 'None', duration: 600, delay: 200 }
      }
    }, args.cell as HTMLTableCellElement);

  }  
}

goListProductsResume(){
  this.showAgreementResumeTable = true;
 this.showAgreementResultTable = false;
 this.enableArrow = false;
 this.enableEntireAgreement = true;
 this.listAgreementDResume();

}

hasMaxAmount(){
  this.showAmountInput = (this.maxAmountToggle?true:false);
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
    pk_Ac_Trade_Agreement: this.agreementDetail.info.pk_Ac_Trade_Agreement
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



}

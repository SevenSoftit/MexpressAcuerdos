
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems } from '@syncfusion/ej2-grids';
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
  allProducts: boolean = false;
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

 
  constructor(public matDialog: MatDialog, private activated_route: ActivatedRoute, private providerService: ProviderService, private _common: CommonService,  private typeOfAgreementService: TypeOfAgreementService,
    private tradeAgreementDetailService: TradeAgreementDetailService) {
      
      this.activated_route.queryParams.subscribe(params => {     
        var parameters = params["agreementDet"];

       if(parameters != undefined){
        this.agreementDetail = JSON.parse(parameters);
        if (this.agreementDetail.info.pk_Ac_Trade_Agreement !== null && this.agreementDetail.info.pk_Ac_Trade_Agreement !== undefined) {
          this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          this.behaviorTA = this.agreementDetail.info.behavior;
        }
      }
      });    
  }

  ngOnInit() {
    this.listTypeOfAgreement();
    this.getScreenSize();
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
      this.allProducts = this.agreementDetail.info.all_Products;
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
    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 9, pageCount: 5 };
    } else {
      this.pageSettings = { pageSize: 4, pageCount: 5 };
    }
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };



  dataBound() {
    this.grid.gridLines = 'Both';
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
        this.listProvider();
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
        this.listAgreementDResume();
      },
      error => {
        this._common._setLoading(false);
        console.error(error);
      }
    )
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
    agreementProductInfoDetailModel.Behavior = this.behaviorTA;
    this.tradeAgreementDetailService.viewAgreementProductDetails(agreementProductInfoDetailModel).subscribe(
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



}

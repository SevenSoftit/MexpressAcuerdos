import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { GridComponent, ToolbarItems, ExcelExportProperties, GridLine } from '@syncfusion/ej2-angular-grids';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { QueryCellInfoEventArgs, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DataUtil } from '@syncfusion/ej2-data';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { TradeAgreementDetailService } from 'src/app/shared/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { AgreementProductInfoModel } from 'src/app/models/agreementProductInfo.model';


@Component({
  selector: 'app-agreement-tracking',
  templateUrl: './agreement-tracking.component.html',
  styleUrls: ['./agreement-tracking.component.scss'],
})
export class AgreementTrackingComponent implements OnInit {
  public heightGridLW: any;
  public lines: GridLine;
  public initialSort: Object;
  public pageSettings: Object;
  public editSettings: Object;
  screenHeight: any;
  screenWidth: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  public dataTable: any = [];
  public activeAgreements: boolean = true;
  public inactiveAgreements: boolean = false;
  statusList: any;
  public isActiveAgreement: Boolean = false;
  public toolbar: ToolbarItems[] | Object;
  public filterOptions: FilterSettingsModel;
  //dataProvider: any;
  dataFilter: any = [];
  agreementOption: any;
  status: boolean = true;
  public tooltipp: Tooltip;
  agreementProductInfoModel = new AgreementProductInfoModel();
  public arrayPost: any = [];


  //config for status filter
  public data: object[];
  public height = '220px';
  public dropdata: string[];
  public onChange(args: any): void {
    if (args.value !== 'All') {
      this.grid.filterByColumn('agreement_Status_Name', 'equal', args.value);
    } else {
      this.grid.removeFilteredColsByField('agreement_Status_Name');
    }
  }

  // config for provider filter
  public dataProvider: object[];
  public dropdataProvider: string[];
  public onChangeProvider(args: any): void {
    if (args.value !== 'All') {
      this.grid.filterByColumn('provider_Name', 'equal', args.value);
    } else {
      this.grid.removeFilteredColsByField('provider_Name');
    }
  }

  constructor(private activated_route: ActivatedRoute, private router: Router, private _common: CommonService, private tradeAgreementDetailService: TradeAgreementDetailService, ) {
    this.activated_route.queryParams.subscribe(params => {
      var parameters = params["active_Agreements"];
      if (parameters != undefined) {
        this.agreementOption = JSON.parse(parameters);
        if (this.agreementOption.info !== null && this.agreementOption.info !== undefined) {
          this.status = this.agreementOption.info;
          this.listHeaderAgreement(this.status);
          this.activeAgreements = false;
          this.inactiveAgreements = true;
        }
      }
    });
  }

  ngOnInit() {
    this._common._setLoading(true);
    this.getScreenSize();
    this.listHeaderAgreement(this.status);
    this.initialSort = { columns: [{ field: 'provider_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.filterOptions = {
      type: 'FilterBar', mode: 'OnEnter', ignoreAccent: true
    };
    this.toolbar = [{ text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];
    this.lines = 'Both';
    // this.searchOptions = {operator: 'contains', key: '', ignoreCase: true };
  }


  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 12, pageCount: 5 };
      this.heightGridLW = 290;
    } else {
      this.pageSettings = { pageSize: 7, pageCount: 5 };
      this.heightGridLW = 290;
    }
    
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };

  dataBound() {
    // this.grid.gridLines = 'Both';
    // Object.assign((this.grid.filterModule as any).filterOperators, { startsWith: 'contains' });

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
listHeaderAgreement(status: boolean) {
  var data = new NewAgreementDetailHeaderModel();
  data.Active = status;
  this.isActiveAgreement = data.Active;
  this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
    dataQ => {
      this.dropdata = [];
      this.dropdataProvider = [];

      this.dataTable = dataQ.filter(dataOpt => dataOpt.agreement_Status_Name !== 'All' && dataOpt.provider_Name !== 'All');

    let hash = {};
    this.dataTable = this.dataTable.filter(function(current) {
      let exists = (!hash[current.pk_Ac_Trade_Agreement] || false);
      hash[current.pk_Ac_Trade_Agreement] = true;
      return exists;
    });

      this.dataFilter = dataQ;
      this.dropdata = DataUtil.distinct(this.dataFilter, 'agreement_Status_Name') as string[];
      this.dropdataProvider = DataUtil.distinct(this.dataFilter, 'provider_Name') as string[];    
      this._common._setLoading(false);
      
    },
    error => {
      this._common._setLoading(false);
      console.log('no se envio' + ' ' + error);
    });
}


calculateAmounts(status: boolean){
//Insertar logica para el calculo posterior de montos, esta logica va a eliminar e insertar la nueva data en la tabla details resume
        this.arrayPost = this.dataTable;     
        this.agreementProductInfoModel.Agreement_Product_Info_List = this.arrayPost;
        this.tradeAgreementDetailService.calculateAmounts(this.agreementProductInfoModel).subscribe(
          dataI => {
            this.listHeaderAgreement(status);
          },
          error => {
            this._common._setLoading(false);
            console.error(error);
          }
        )
}

  /*******************************************************
* Author: Gustavo ZC
* Creation date:  01/08/2019
* Description: method that lists the products of the agreement whether active or inactive
****************************************************
* Modifications
****************************************************
* Number:
* Date:
* Ticket:
* Author:
* Description:
*******************************************************/
  listSpecificHeaderAgreement(evt: any) {
    this._common._setLoading(true);
    let dataFilter: any;
    var data = new NewAgreementDetailHeaderModel();
    this.resetRadio();
    var target = evt.target;

    if (target.value == "option1") {
      this.activeAgreements = true;
      this.inactiveAgreements = false;
      data.Active = this.activeAgreements;
      this.isActiveAgreement = data.Active;
    } else {
      this.inactiveAgreements = true;
      this.activeAgreements = false;
      data.Active = false;
      this.isActiveAgreement = data.Active;
    }
    this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
      dataQ => {
        this.dropdata = [];
        this.dropdataProvider = [];

        this.dataTable = dataQ.filter(dataOpt => dataOpt.agreement_Status_Name !== 'All' && dataOpt.provider_Name !== 'All');
        
        let hash = {};
        this.dataTable = this.dataTable.filter(function(current) {
          let exists = (!hash[current.pk_Ac_Trade_Agreement] || false);
          hash[current.pk_Ac_Trade_Agreement] = true;
          return exists;
        });

        dataFilter = dataQ;
        this.dropdata = DataUtil.distinct(dataFilter, 'agreement_Status_Name') as string[];
        this.dropdataProvider = DataUtil.distinct(dataFilter, 'provider_Name') as string[];
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }

  resetRadio() {
    if (this.inactiveAgreements) {
      this.inactiveAgreements = false;
      this.activeAgreements = true;
    } else {
      this.activeAgreements = true;
    }
  }

  viewAgreementTrackingDetails(args: any): void {
    this._common._setLoading(true);
    let data: any = this.grid.getRowInfo(args.target).rowData;
    const agreementDet = {
      info: data
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'agreementDet': JSON.stringify(agreementDet)
      },
      skipLocationChange: true
    };
    this.router.navigate(['agreementTrackingDetail'], navigationExtras);
    this._common.asignHeaderTitle("Detalle del seguimiento");
  }

  tooltip(args: QueryCellInfoEventArgs) {
    if (args.column.field === "provider_Name" || args.column.field === "name_Agreement") {
      let tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString(),
        animation: {
          open: { effect: 'None', duration: 1000, delay: 200 },
          close: { effect: 'None', duration: 600, delay: 200 }
        }
      }, args.cell as HTMLTableCellElement);
    }
  }
      // Opcion para Excel
      toolbarClick(args: ClickEventArgs): void {
        if (args.item.id == "export") {
          var date = new Date().toISOString().slice(0, 10);
          var archiveName = 'Reporte_De_Acuerdos_' + date + '.xlsx'
    
          const excelExportProperties: ExcelExportProperties = {
            fileName: archiveName
          };
    
          this.grid.excelExport(excelExportProperties);
        }
      }
}

import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GridComponent, ToolbarItems, QueryCellInfoEventArgs, FilterSettingsModel, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DataUtil } from '@syncfusion/ej2-data';
import { MatDialog } from '@angular/material';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { TradeAgreementDetailService } from 'src/app/shared/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-trade-agreements',
  templateUrl: './trade-agreements.component.html',
  styleUrls: ['./trade-agreements.component.scss']
})
export class TradeAgreementsComponent implements OnInit {
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
  public isActiveAgreement: Boolean = true;
  SearchInfo: any = [];
  // public searchOptions: SearchSettingsModel;
  public filterOptions: FilterSettingsModel;
  disableEdit: boolean = false;
  public toolbar: ToolbarItems[] | Object;
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
  //--------------------------------------------------

  constructor(public matDialog: MatDialog, private router: Router, private _common: CommonService, private tradeAgreementDetailService: TradeAgreementDetailService, ) {
  }

  ngOnInit() {
    this._common._setLoading(true);

    this.getScreenSize();
    this.initialSort = { columns: [{ field: 'provider_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
  
    this.filterOptions = {
      type: 'FilterBar', mode: 'OnEnter', ignoreAccent: true
    };
    this.toolbar = [{ text: 'Exportar a Excel', prefixIcon: 'e-excelexport', id: 'export' }];
    // this.searchOptions = {operator: 'contains', key: '', ignoreCase: true };
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1900) {
      this.pageSettings = { pageSize: 11, pageCount: 5 };
    } else {
      this.pageSettings = { pageSize: 7, pageCount: 5 };
    }
    this.listHeaderAgreement();
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };

  dataBound() {
    this.grid.gridLines = 'Both';
    Object.assign((this.grid.filterModule as any).filterOperators, { startsWith: 'contains' });

  }

  redirectPageCreateNewAgreement() {
    this.router.navigate(["newTradeAgreements"]);
    this._common.asignHeaderTitle("Nuevo acuerdo comercial");

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
  listHeaderAgreement() {
    let dataFilter: any;
    var data = new NewAgreementDetailHeaderModel();
    data.Active = true;
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

  // listAgreementStatus() {
  //   var catalogModel = new CatalogModel();
  //   catalogModel.Fk_Glb_Cat_Type_Catalog = 1;
  //   this.tradeAgreementDetailService.ListAgreementStatus(catalogModel).subscribe(
  //     dataQ => {
  //       this.statusList = dataQ;
  //       this._common._setLoading(false); 
  //     },
  //     error => {
  //       this._common._setLoading(false);
  //       console.log('no se envio' + ' ' + error); 
  //     });
  // }

  //INICIO SECCION DE BUSQUEDAS POR FILTRO
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
  //Filtro por estados activos e inactivos
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

  /*******************************************************
* Author: Gustavo ZC
* Creation date:  19/08/2019
* Description: method that search an specific name agreement
****************************************************/
  //Filtro por nombre del acuerdo

  // listNameAgreement(evt: any) {
  //   var data = new NewAgreementDetailHeaderModel();
  //   data.Active = this.isActiveAgreement;
  //   data.Name_Agreement = evt.value;
  //   data.Date_Start = this.any_date_agreement;
  //   data.Date_Finish = this.any_date_agreement;
  //   data.Fk_Status_Agreement = this.agreement_status;
  //   this.agreement_name_search = evt.value;
  //   this.tradeAgreementDetailService.listNameAgree(data).subscribe(
  //     dataV => {
  //       this.dataTable = dataV;
  //     },
  //     error => {
  //       this._common._setLoading(false);
  //       console.error(error);
  //     }
  //   )
  // }

  //Filtro por fecha (fecha de inicio o fecha de finalizacion)
  // selectedDate(evt: any) {
  //   this._common._setLoading(true);
  //   var data = new NewAgreementDetailHeaderModel();
  //   data.Active = this.isActiveAgreement;
  //   data.Name_Agreement = this.agreement_name_search;
  //   data.Date_Start = evt.value;
  //   data.Date_Finish = evt.value;
  //   data.Fk_Status_Agreement = this.agreement_status;
  //   this.any_date_agreement = evt.value; 

  //   this.tradeAgreementDetailService.listAgreementDate(data).subscribe(
  //     dataQ => {
  //       this.dataTable = dataQ;
  //       this._common._setLoading(false);
  //     },
  //     error => {
  //       this._common._setLoading(false);
  //       console.log('no se envio' + ' ' + error);
  //     });
  // }


  //Filtro por los demas estados (En proceso, vencidos, finalizados, conciliados, todos los estados)
  // behaviorStatus(evt: any) {
  //   this._common._setLoading(true);
  //   var data = new NewAgreementDetailHeaderModel();
  //   data.Active = this.isActiveAgreement;
  //   data.Name_Agreement = this.agreement_name_search;
  //   data.Date_Start = this.any_date_agreement;
  //   data.Date_Finish = this.any_date_agreement;
  //   data.Fk_Status_Agreement = evt.value;

  //   this.agreement_status = evt.value; 
  //   this.tradeAgreementDetailService.ListHeaderAgreementDetailStatus(data).subscribe(
  //     dataQ => {
  //       this.dataTable = dataQ;
  //       this._common._setLoading(false);
  //     },
  //     error => {
  //       this._common._setLoading(false);
  //       console.log('no se envio' + ' ' + error);
  //     });
  // }
  //FIN SECCION DE BUSQUEDAS POR FILTRO

  resetRadio() {
    if (this.inactiveAgreements) {
      this.inactiveAgreements = false;
      this.activeAgreements = true;
    } else {
      this.activeAgreements = true;
    }
  }

  viewAgreementDetails(args: any): void {
    this._common._setLoading(true);
    let data: any = this.grid.getRowInfo(args.target).rowData;
    if (data.agreement_Status_Name != 'Finalizado' && data.agreement_Status_Name != 'Conciliado') {
      const agreementDet = {
        info: data
      }
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'agreementDet': JSON.stringify(agreementDet)
        },
        skipLocationChange: true
      };
      this.router.navigate(['newTradeAgreements'], navigationExtras);
      this._common.asignHeaderTitle("Editar acuerdo");
    } else {
      this._common._setLoading(false);
      if(data.agreement_Status_Name == 'Finalizado'){
        this.agreementFinalizedAlertModal();
      }
      if(data.agreement_Status_Name == 'Conciliado'){
        this.agreementConciledAlertModal();
      }
    }
  }

  public agreementFinalizedAlertModal() {
    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'No puede editar este acuerdo pues ya se encuentra en estado finalizado. Favor, pasar a la sección de SEGUIMIENTO para ver los detalles del acuerdo',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '40vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 5300);
  }

  public agreementConciledAlertModal() {
    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'No se pueden editar los acuerdos en estado conciliado. Favor, pasar a la sección de SEGUIMIENTO para ver los detalles del acuerdo',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '40vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 5300);
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

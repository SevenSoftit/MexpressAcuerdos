import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { GridComponent, ToolbarItems, QueryCellInfoEventArgs, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { CatalogModel } from '../common-model/catalog.Model';
import { Grid, Filter, IFilter } from '@syncfusion/ej2-grids';
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
  public dataTable: Object[] = [];
  public activeAgreements: boolean = true;
  public inactiveAgreements: boolean = false;
  statusList: any;
  public isActiveAgreement: Boolean = true;
  public toolbar: ToolbarItems[] | Object;
  SearchInfo: any = [];
  agreement_name_search: string = '';
  agreement_status: number = 0;
  any_date_agreement = new Date();
  public nameAgreementList: Object[] = [];
  // public searchOptions: SearchSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filter: IFilter;

  constructor(private router: Router, private _common: CommonService, private tradeAgreementDetailService: TradeAgreementDetailService, ) { 
  }

  ngOnInit() {
   this._common._setLoading(true);

    this.getScreenSize();
    this.initialSort = { columns: [{ field: 'provider_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.toolbar = ['Search'];

    this.filterOptions = {
      type: 'FilterBar', mode: 'OnEnter', ignoreAccent: true,
    columns: [{ field: 'name_Agreement', matchCase: false, operator: 'startsWith', value: 'prueba 4'}
    //   // { field: 'agreement_Status_Name', matchCase: false, operator: 'contains'},
    //   // { field: 'provider_Name', matchCase: false, operator: 'contains'},
    //   // { field: 'date_Start', matchCase: false, operator: 'equal'},
    //   // { field: 'date_Finish', matchCase: false, operator: 'equal'}
    //   { field: 'date_Finish', matchCase: false, operator: 'equal'}
     ]
  };
    // this.searchOptions = {operator: 'contains', key: '', ignoreCase: true };

  //   this.grid = new Grid({
  //     dataSource: this.dataTable,
  //     allowFiltering: true,
  //     columns: [
  //         { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 100, allowFiltering: false },
  //         { field: 'CustomerID', headerText: 'Customer ID', width: 120, allowFiltering: false },
  //         { field: 'ShipCity', headerText: 'Ship City', width: 100 },
  //         { field: 'ShipName', headerText: 'Ship Name', width: 100, allowFiltering: false }
  //     ],
  //     height: 273
  // });
  // this.grid.appendTo('#Grid');
    
  this.filter = {
    type: 'CheckBox'
};

    this.listHeaderAgreement();
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
  var data = new NewAgreementDetailHeaderModel();
  data.Active = true;
  this.isActiveAgreement = data.Active;
  this.nameAgreementList = [];

  this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
    dataQ => {
      this.dataTable = dataQ;
      this.nameAgreementList = dataQ;
      this.listAgreementStatus();
    },
    error => {
      this._common._setLoading(false);
      console.log('no se envio' + ' ' + error);
    });
}

listAgreementStatus() {
  var catalogModel = new CatalogModel();
  catalogModel.Fk_Glb_Cat_Type_Catalog = 1;
  this.tradeAgreementDetailService.ListAgreementStatus(catalogModel).subscribe(
    dataQ => {
      this.statusList = dataQ;
      this._common._setLoading(false); 
    },
    error => {
      this._common._setLoading(false);
      console.log('no se envio' + ' ' + error); 
    });
}

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
    this.agreement_name_search = '';
    this.nameAgreementList = [];
    this._common._setLoading(true);
    var data = new NewAgreementDetailHeaderModel();     
    this.resetRadio();
    var target = evt.target;

    if(target.value == "option1"){
        this.activeAgreements = true;
        this.inactiveAgreements = false;
        data.Active = this.activeAgreements;
        this.isActiveAgreement = data.Active;
}else{
  this.inactiveAgreements = true;
  this.activeAgreements = false;  
  data.Active = false;
  this.isActiveAgreement = data.Active;
}
data.Name_Agreement = this.agreement_name_search;
data.Date_Start = this.any_date_agreement;
data.Date_Finish = this.any_date_agreement; 
data.Fk_Status_Agreement = this.agreement_status;


    this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
      dataQ => {
        this.dataTable = dataQ;
        this.nameAgreementList = dataQ;
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

listNameAgreement(evt: any) {
  var data = new NewAgreementDetailHeaderModel();
  data.Active = this.isActiveAgreement;
  data.Name_Agreement = evt.value;
  data.Date_Start = this.any_date_agreement;
  data.Date_Finish = this.any_date_agreement;
  data.Fk_Status_Agreement = this.agreement_status;
  this.agreement_name_search = evt.value;
  this.tradeAgreementDetailService.listNameAgree(data).subscribe(
    dataV => {
      this.dataTable = dataV;
    },
    error => {
      this._common._setLoading(false);
      console.error(error);
    }
  )
}

//Filtro por fecha (fecha de inicio o fecha de finalizacion)
selectedDate(evt: any) {
  this._common._setLoading(true);
  var data = new NewAgreementDetailHeaderModel();
  debugger;
  data.Active = this.isActiveAgreement;
  data.Name_Agreement = this.agreement_name_search;
  data.Date_Start = evt.value;
  data.Date_Finish = evt.value;
  data.Fk_Status_Agreement = this.agreement_status;
  this.any_date_agreement = evt.value; 

  this.tradeAgreementDetailService.listAgreementDate(data).subscribe(
    dataQ => {
      this.dataTable = dataQ;
      this._common._setLoading(false);
    },
    error => {
      this._common._setLoading(false);
      console.log('no se envio' + ' ' + error);
    });
}


//Filtro por los demas estados (En proceso, vencidos, finalizados, conciliados, todos los estados)
  behaviorStatus(evt: any) {
    this._common._setLoading(true);
    var data = new NewAgreementDetailHeaderModel();
    data.Active = this.isActiveAgreement;
    data.Name_Agreement = this.agreement_name_search;
    data.Date_Start = this.any_date_agreement;
    data.Date_Finish = this.any_date_agreement;
    data.Fk_Status_Agreement = evt.value;
    
    this.agreement_status = evt.value; 
    this.tradeAgreementDetailService.ListHeaderAgreementDetailStatus(data).subscribe(
      dataQ => {
        this.dataTable = dataQ;
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }
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
    this.router.navigate(['newTradeAgreements'], navigationExtras);
    this._common.asignHeaderTitle("Editar acuerdo");
  }

  tooltip(args: QueryCellInfoEventArgs) {
    if(args.column.field === "provider_Name")  {

  }  
} 



}

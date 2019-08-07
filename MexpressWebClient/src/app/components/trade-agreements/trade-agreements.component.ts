import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { CatalogModel } from '../common-model/catalog.Model';

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
  public isActiveAgreement: Boolean = false;
  public toolbar: ToolbarItems[] | Object;;

  constructor(private router: Router, private _common: CommonService, private tradeAgreementDetailService: TradeAgreementDetailService, ) { }

  ngOnInit() {

    this.initialSort = { columns: [{ field: 'provider_Name', direction: 'Ascending' }] };
    this.pageSettings = { pageSize: 8, pageCount: 5 };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.toolbar = ['Search'];
    this.listHeaderAgreement();
    this.listAgreementStatus();
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

  dataBound(args: any) {
    this.grid.gridLines = 'Both';
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
  this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
    dataQ => {
      this.dataTable = dataQ;
      this._common._setLoading(false);
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
    this.tradeAgreementDetailService.ListHeaderAgreementDetail(data).subscribe(
      dataQ => {
        this.dataTable = dataQ;
        this._common._setLoading(false);
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }

  behaviorStatus(evt: any) {
    var data = new NewAgreementDetailHeaderModel();
    data.Fk_Status_Agreement = evt.value;
    data.Active = this.isActiveAgreement;
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


}

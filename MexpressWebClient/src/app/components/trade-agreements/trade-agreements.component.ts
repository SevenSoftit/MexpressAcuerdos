import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';

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
  public dataTable: any;


  constructor(private router: Router, private _common: CommonService, private tradeAgreementDetailService: TradeAgreementDetailService, ) { }

  ngOnInit() {

    this.initialSort = { columns: [{ field: 'provider_Name', direction: 'Ascending' }] };
    this.pageSettings = { pageSize: 8, pageCount: 5 };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
    this.listHeaderAgreement();
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

  viewAgreementDetails(args: any): void {
    debugger;
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
    this._common.asignHeaderTitle("Nuevo acuerdo comercial");
  }
}

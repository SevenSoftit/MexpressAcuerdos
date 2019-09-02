import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { Tooltip } from '@syncfusion/ej2-popups';
import { AgreementReportService } from 'src/app/services/agreementReport/agreementReport.service';
import { AgreementProductInfoDetailModel } from 'src/app/models/agreementProductInfoDetail.model';
import { CommonService } from 'src/app/services/common/common.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-agreement-report',
  templateUrl: './agreement-report.component.html',
  styleUrls: ['./agreement-report.component.scss']
})
export class AgreementReportComponent implements OnInit {
  agreementReport: any;
  public dataTableReport: any;
  @ViewChild("grid", { static: false })
  public grid: GridComponent;
  screenHeight: any;
  screenWidth: any;    
  heightGridLW: any;
  public initialSort: Object;
  public pageSettings: Object;
  public editSettings: Object;
  public titulo: string = 'Esto es una prueba';

  constructor(public matDialog: MatDialog, private _common: CommonService, private activated_route: ActivatedRoute, private reportService: AgreementReportService) {
    this.activated_route.queryParams.subscribe(params => {
      var parameters = params["reportInfo"];

      if (parameters != undefined) {
        this.agreementReport = JSON.parse(parameters);
        if (this.agreementReport.infoTable !== null && this.agreementReport.infoTable !== undefined) {
          this.dataTableReport = this.agreementReport.infoTable;
        }
      }    
    });
  }

  ngOnInit() {
    this.getScreenSize();
    this.initialSort = { columns: [{ field: 'product_Name', direction: 'Ascending' }] };
    this.editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false, newRowPosition: 'Top' };
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



}

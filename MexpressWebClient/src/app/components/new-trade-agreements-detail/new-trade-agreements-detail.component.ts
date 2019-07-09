import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations/src/toolbar';
import { ExcelExportProperties, ToolbarItems, IEditCell } from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MatDialog } from '@angular/material/dialog';
import { ImportProductComponent } from '../import-product/import-product.component';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-new-trade-agreements-detail',
  templateUrl: './new-trade-agreements-detail.component.html',
  styleUrls: ['./new-trade-agreements-detail.component.scss']
})
export class NewTradeAgreementsDetailComponent implements OnInit {
  newAgreementForm: FormGroup;
  showErrors = false;
  type_of_agreement: any;
  provider: any;
  @ViewChild("grid", {static: false})
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
  public moneyTypeParams: IEditCell;
  private typeContacElem: HTMLElement;
  private typeContactObj: DropDownList;
  listsMoney: { [key: string]: Object }[] = [];
  docHasErrors = false;
  headerFile: number = 0;
  public showWorkTable: boolean = false;
  title = 'Todos los empleados';
  public moneyModel: MoneyModel = new MoneyModel();
  constructor(public matDialog: MatDialog, private _common: CommonService) { }

  ngOnInit() {

    this.newAgreementForm = new FormGroup({
      agreement_name: new FormControl('', [Validators.required]),

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
     
     this.listMoney();

    //  this.moneyTypeParams = {
    //   params: { popupHeight: '300px' },
    //   create: () => {
    //     this.typeContacElem = document.createElement("input");
    //     return this.typeContacElem;
    //   },
    //   read: () => {
    //     return this.typeContactObj.value;
    //   },
    //   destroy: () => {
    //     this.typeContactObj.destroy();
    //   },
    //   write: () => {
    //     this.typeContactObj = new DropDownList({
    //       dataSource: this.listsMoney,

    //       fields: { value: "id_Currency", text: "name_Currency" },
    //       enabled: true,
    //       placeholder: "Seleccione la moneda",
    //       floatLabelType: "Never"
    //     });
    //     this.typeContactObj.appendTo(this.typeContacElem);
    //     this.typeContactObj.dataBind();
    //   }
    // };

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
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

  // actionBegin(args: any): void {
  //   let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
  //   if (args.requestType === 'save') {
  //     if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
  //       args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
  //     } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
  //       args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
  //     }

  //     if (args.action == "add" || args.action == "edit")
  //       this.saveWorkLine(args.data);
  //   }
  //   else if (args.requestType === 'delete') {
  //     this.deleteWorkLine(args.data);
  //   }
  //   else if (args.requestType === 'beginedit') {
  //     gridInstance.ej
  //   }
  // }

  actionBeginWork(args: any): void {
    let gridInstance: any = (<any>document.getElementById('NormalgridWork')).ej2_instances[0];
    if (args.requestType === 'save') {
      if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
      }

      if (args.action == "add" || args.action == "edit") {

        //this.updateWorkEmployee(args, false);
      }
    }
    else if (args.requestType === 'delete') {
      //this.updateWorkEmployee(args, true);
    }
    else if (args.requestType === 'beginedit') {
      gridInstance.ej
    }
  }

        //Pinta los campos erroneos en rojo
    rowDataBound(args: any): void {

      if (args.data.error == true) {
  
        args.row.style.backgroundColor = "#F3C3C3";
        this.docHasErrors = true;
      }
  
      this.headerFile = args.data.fk_Gbl_Wrk_Agreement_Header;
      
      this.grid.gridLines = 'Both';
    }
  
    // dataBound(args: any) {
    //     this.grid.gridLines = 'Both';
    //   }
  

  behaviorTypeOfAgreement(value: any){
  }

  behaviorProvider(value: any){
  }

  uploadArchive(){
  }

  openDialogImportProduct(): void {
    const dialogRef = this.matDialog.open(ImportProductComponent, { minWidth: '564px', maxWidth: '564px', minHeight: '406px', maxHeight:'420px' });
    dialogRef.afterClosed().subscribe(
      result => {
debugger;
        if (result != undefined) {
          this.workDataTable = result;
          this.showWorkTable = true;
          this.title = 'Registros importados del Excel';

        }
      }
    );

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

  // var modelArray = new NewGroupModel();
  this.allGroupService.ListAllGroupArray(this.newGroupModel).subscribe(
    dataS => {
      const that = this;
      dataS.forEach(function (item) {
        that.listsMoney.push({
          group_Identifier: item.group_Identifier,
          group_Name: item.group_Name
        });
      });
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
        if(args.item.id == "export"){
        var date = new Date().toISOString().slice(0,10);
        var archiveName = 'Reporte_De_Productos_' + date + '.xlsx'
    
        const excelExportProperties: ExcelExportProperties = {
          fileName: archiveName
        };
    
        this.grid.excelExport(excelExportProperties);
      }
    }

    cancel(): void {
      this.showWorkTable = false;
      this.title = 'Todos los empleados';
    }

}

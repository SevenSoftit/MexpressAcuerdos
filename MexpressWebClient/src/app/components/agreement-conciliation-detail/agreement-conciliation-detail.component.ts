import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEditCell } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MatDialog } from '@angular/material/dialog';
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
import { CatalogModel } from '../common-model/catalog.Model';
import { ActivatedRoute } from '@angular/router';
import { GoalsLoaderComponent } from '../goals-loader/goals-loader.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ListEvidencesModalComponent } from '../list-evidences-modal/list-evidences-modal.component';



@Component({
  selector: 'app-agreement-conciliation-detail',
  templateUrl: './agreement-conciliation-detail.component.html',
  styleUrls: ['./agreement-conciliation-detail.component.scss']
})
export class AgreementConciliationDetailComponent implements OnInit {
  newAgreementForm: FormGroup;
  type_of_agreement: any;
  providerN: any;
  screenHeight: any;
  screenWidth: any;
  public moneyTypeParams: IEditCell;
  private typeContacElem: HTMLElement;
  private typeContactObj: DropDownList;
  listsMoney: { [key: string]: Object }[] = [];
  typeOfAgreementList: any;
  providerList: any = [];
  headerFile: number = 0;
  nameAgree: string = '';
  public title: string = '';
  public moneyModel: MoneyModel = new MoneyModel();
  public typeOfAgreementModel: TypeOfAgreementModel = new TypeOfAgreementModel();
  public providerModel: ProviderModel = new ProviderModel();
  agreement_activator: boolean = false;
  showGoals = false;
  allproducts_activator = false;
  dateProcess: Date = new Date();
  dateReprocess: Date = new Date();
  enableEvidence: boolean = false;
  listHeader: any = [];
  catalogModel: CatalogModel = new CatalogModel();
  search_key: string = 'agreement_status_in_process';
  fk_Status_Agreement: number = 0;
  agreementDetail: any;
  fk_Glb_Mtr_Organization: number = 1;
  option = true;
  SearchInfo: any = [];
  //#region InfiniteScrollVariables
  total = 0;
  limit = 7;
  offset = 0;
  options = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;
  pageNumber = 1;
  completeLoad = false;
  percentage:string='25%';
  //#endregion InfiniteScrollVariables
  maxAmountToggle = false;
  maxAmount: number = 0;
  showAmountInput = false;
  emailNotification: string = '';

  constructor(private tradeAgreementDetailService: TradeAgreementDetailService, public matDialog: MatDialog, private _common: CommonService,
    private allMoneyService: AllMoneyService, private typeOfAgreementService: TypeOfAgreementService,
    private providerService: ProviderService, private activated_route: ActivatedRoute) {

    this._common._setLoading(true);
    this.activated_route.queryParams.subscribe(params => {
      var parameters = params["agreementDet"];

      if (parameters != undefined) {
        this.agreementDetail = JSON.parse(parameters);
        if (this.agreementDetail.info.pk_Ac_Trade_Agreement !== null && this.agreementDetail.info.pk_Ac_Trade_Agreement !== undefined) {
          this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          var agreement = new NewAgreementModel();

          agreement.Pk_Ac_Trade_Agreement = this.agreementDetail.info.pk_Ac_Trade_Agreement;
          this.nameAgree = this.agreementDetail.info.name_Agreement;
          this.providerModel.Name_Provider = this.agreementDetail.info.provider_Name;
          this.showGoals = this.agreementDetail.info.all_Products;
          
          if(this.agreementDetail.info.max_Amount !== 0){
              this.maxAmountToggle = true;
              this.showAmountInput = true;
          }
          this.listAgreement(agreement);
        }
      }
    });
  }

  ngOnInit() {
    this.getScreenSize();
    this.getKeyStatus();

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
      description: new FormControl(''),
      emailNotification: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });

    this.listProvider(this.option);  
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

          fields: { value: "name_Currency", text: "name_Currency" },
          enabled: true,
          placeholder: "Seleccione la moneda",
          floatLabelType: "Never"
        });
        this.typeContactObj.appendTo(this.typeContacElem);
        this.typeContactObj.dataBind();
      }
    };
    this.fillFormAgreementDetail();
  }

  fillFormAgreementDetail() {
    if (this.agreementDetail != undefined) {
      this.newAgreementForm.patchValue({
        agreement_name: this.agreementDetail.info.name_Agreement,
        description: this.agreementDetail.info.description_Agreement,
        startDatePicker: new Date(this.agreementDetail.info.date_Start),
        endDatePicker: new Date(this.agreementDetail.info.date_Finish),
        emailNotification: this.agreementDetail.info.email

      });
      this.headerFile = this.agreementDetail.info.pk_Ac_Trade_Agreement;
      this.type_of_agreement = this.agreementDetail.info.pk_Cat_Type_Agreement;
      this.providerN = this.agreementDetail.info.pk_Ac_Cat_Provider;
      this.dateProcess = this.agreementDetail.info.date_Process;
      this.dateReprocess = this.agreementDetail.info.date_Reprocess;
      this.allproducts_activator = this.agreementDetail.info.all_Products;
      this.fk_Status_Agreement = this.agreementDetail.info.fk_Status_Agreement;
      this.agreement_activator = this.agreementDetail.info.active;
      this.fk_Glb_Mtr_Organization = this.agreementDetail.info.fk_Glb_Mtr_Organization;
      this.maxAmount= this.agreementDetail.info.max_Amount;
    } else {
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
    } else if (this.screenWidth >= 1536 && this.screenWidth < 1900 && this.screenWidth != 1680) {
    } 
    else if (this.screenWidth > 1900) {
    }
    else if (this.screenWidth == 1680) {
    }

    if (this.screenWidth >= 1900) {
    } else {
    }
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };


  getKeyStatus() {
    this.catalogModel.Search_Key = this.search_key;
    this._common.listCatalog(this.catalogModel).subscribe(
      dataF => {
        this.fk_Status_Agreement = dataF[0].pk_Glb_Cat_Catalog;
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);

      });

  }

  dateChange() {
    var diff = this.newAgreementForm.value.endDatePicker.getTime() - this.newAgreementForm.value.startDatePicker.getTime();

    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (diffDays < 0)
      diffDays = 0;
    else if (diffDays == 0)
      diffDays = 1;
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
  * Author: esalas
  * Creation date:  16/08/2019
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
    this.tradeAgreementDetailService.ListTradeAgreementDetail(data).subscribe(
      dataQ => {
        if ((dataQ.length == 0 || dataQ.length != 0) && dataQ != undefined) {
          this.enableEvidence = true;
        }
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });
  }

  cancel(): void {
    this.title == 'Todos los productos';
    var pkH = new NewAgreementModel();
    pkH.Pk_Ac_Trade_Agreement = this.headerFile;
    this.listAgreement(pkH);
  }

  openListEvidenceModal() {
    const object = {
      header_File: this.headerFile,
      name_Agree: this.nameAgree
    }
    const dialogRef = this.matDialog.open(ListEvidencesModalComponent, {
      data: { confirmInfo: object },
      minWidth: "900px",
      maxWidth: "950px"
    });
  }

  openGoals() {
    let value = {
      pk_Ac_Trade_Agreement: this.agreementDetail.info.pk_Ac_Trade_Agreement,
      is_in_follow_up: true 
    }

    const dialogRef = this.matDialog.open(GoalsLoaderComponent, {
      data: value,
      minWidth: '85vw', maxWidth: '85vw', maxHeight: '100vh', minHeight: '60vh'
    });   
  }

  hasMaxAmount(){
    this.showAmountInput = (this.maxAmountToggle?true:false);
  }
}

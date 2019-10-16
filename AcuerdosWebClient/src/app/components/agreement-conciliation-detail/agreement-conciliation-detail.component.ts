import { Component, OnInit, HostListener} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEditCell } from '@syncfusion/ej2-grids';
import { MatDialog } from '@angular/material/dialog';
import { MoneyModel } from 'src/app/models/money.model';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';
import { ProviderModel } from 'src/app/models/provider.model';
import { NewAgreementModel } from 'src/app/models/newAgreement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { CatalogModel } from 'src/app/models/catalog.Model';
import { ListEvidencesModalComponent } from 'src/app/shared/modal/list-evidences-modal/list-evidences-modal.component';
import { GoalsLoaderComponent } from 'src/app/shared/modal/goals-loader/goals-loader.component';
import { TradeAgreementDetailService } from 'src/app/shared/services/tradeAgreementDetail/tradeAgreementDetail.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AllMoneyService } from 'src/app/shared/services/allMoney/allMoney.service';
import { TypeOfAgreementService } from 'src/app/shared/services/typeOfAgreement/typeOfAgreement.service';
import { ProviderService } from 'src/app/shared/services/TaProvider/provider.service';
import { FeedbackDescriptionModalComponent } from 'src/app/shared/modal/feedback-description-modal/feedback-description-modal.component';
import { NewAgreementDetailHeaderModel } from 'src/app/models/newAgreementDetailHeader.model';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { utiles } from 'src/environments/utiles';




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
  listHeader: any = [];
  catalogModel: CatalogModel = new CatalogModel();
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
  recovery_amount: number = 0;
  fk_Status_Agreement: number = 0;
  search_key: string = 'agreement_status_conciled';
  newAgreementDetailHeaderModel: NewAgreementDetailHeaderModel = new NewAgreementDetailHeaderModel();
  infoUser = utiles.getInfoUser();
  provid_Name: string = '';
  status_agree: string = '';
  status_type: string = ''
  initial_Date: string = '';
  end_Date: string = '';
  disabledButtonConciliation: boolean = false;
  statusValidation: boolean = false;
  currencyName: string = '';

  constructor(private router: Router, private tradeAgreementDetailService: TradeAgreementDetailService, public matDialog: MatDialog, private _common: CommonService, 
    private typeOfAgreementService: TypeOfAgreementService,
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
          this.providerModel.Name_Provider = this.agreementDetail.info.provider_Name;
          this.showGoals = this.agreementDetail.info.all_Products;
          this.disabledButtonConciliation = (this.agreementDetail.info.agreement_Status_Name == 'Conciliado') ? true : false;
          this.statusValidation = (this.agreementDetail.info.agreement_Status_Name == 'Conciliado' || this.agreementDetail.info.agreement_Status_Name == 'Finalizado') ? true : false;
          // Resumen table
          this.nameAgree = this.agreementDetail.info.name_Agreement;
          this.status_agree = this.agreementDetail.info.agreement_Status_Name;
          this.status_type = this.agreementDetail.info.type_Agreement_Name;
          this.provid_Name = this.agreementDetail.info.provider_Name; 
          this.initial_Date = this.agreementDetail.info.string_Date_Start;
          this.end_Date = this.agreementDetail.info.string_Date_Finish;
          this.recovery_amount = this.agreementDetail.info.string_Recovery_Amount;
          this.currencyName = this.agreementDetail.info.id_Currency;
          //End resumen table
               
          if(this.agreementDetail.info.max_Amount !== 0){ 
              this.maxAmountToggle = true;
              this.showAmountInput = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    this._common._setLoading(true);
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
      description: new FormControl(''),
      emailNotification: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });
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
        emailNotification: ''
      });

    }
    this.getKeyStatus();
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
    this.listTypeOfAgreement();
  }

  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
  ];
  public localFields: Object = { text: 'newRowPosition', value: 'id' };

  listTypeOfAgreement() { 
    this.typeOfAgreementService.listTypeOfAgreement(this.typeOfAgreementModel).subscribe(
      dataS => {
        this.typeOfAgreementList = dataS;
        this.fillFormAgreementDetail();
        
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

  openListEvidenceModal() {
    const object = {
      header_File: this.headerFile,
      name_Agree: this.nameAgree,
      status_validation: this.statusValidation
    }
    const dialogRef = this.matDialog.open(ListEvidencesModalComponent, {
      data: { confirmInfo: object },
      minWidth: "900px",
      maxWidth: "950px"
    });
  }

  public conciliateAgreement() {

    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'El acuerdo pasará a estado conciliado ¿Está seguro(a) de esta acción? Este proceso no es reversible',
      btnAccept: 'Aceptar',
      btnCancel: 'Cancelar',
      status: 'warning'
    };
    const dialogRef = this.matDialog.open(FeedbackDescriptionModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '480px', maxWidth: '480px', maxHeight: '340px', minHeight: '308px'
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.saveAgreementHeader();
        this.router.navigate(['agreementConciliation']);
        this._common.asignHeaderTitle("Conciliación de acuerdos");
      } else {

      }
    });
  }
  saveAgreementHeader() {
    this._common._setLoading(true);
    // var filterProviderName: any = this.providerList.filter(obj => obj.pk_Ac_Cat_Provider == this.providerN);
    this.newAgreementDetailHeaderModel.Pk_Ac_Trade_Agreement = this.headerFile;
    this.newAgreementDetailHeaderModel.Pk_Cat_Type_Agreement = this.type_of_agreement;
    this.newAgreementDetailHeaderModel.Pk_Ac_Cat_Provider = this.providerN;
    this.newAgreementDetailHeaderModel.Creation_User = this.infoUser.username;
    this.newAgreementDetailHeaderModel.Modification_User = this.infoUser.username;
    this.newAgreementDetailHeaderModel.Name_Agreement = this.newAgreementForm.value.agreement_name;
    this.newAgreementDetailHeaderModel.Description_Agreement = this.newAgreementForm.value.description;
    this.newAgreementDetailHeaderModel.Date_Start = this.newAgreementForm.value.startDatePicker;
    this.newAgreementDetailHeaderModel.Date_Finish = this.newAgreementForm.value.endDatePicker;
    this.newAgreementDetailHeaderModel.Date_Process = this.dateProcess;
    this.newAgreementDetailHeaderModel.Date_Reprocess = this.dateReprocess;
    this.newAgreementDetailHeaderModel.All_Products = this.allproducts_activator;
    // this.newAgreementDetailHeaderModel.Provider_Name = (filterProviderName.length == 0 ? '' : filterProviderName[0].name_Provider);
    this.newAgreementDetailHeaderModel.Provider_Name = '';
    this.newAgreementDetailHeaderModel.Fk_Status_Agreement = this.fk_Status_Agreement;
    this.newAgreementDetailHeaderModel.Active = this.agreement_activator;
    this.newAgreementDetailHeaderModel.Fk_Glb_Mtr_Organization = this.fk_Glb_Mtr_Organization;
    this.newAgreementDetailHeaderModel.Max_Amount = this.maxAmount;
    this.newAgreementDetailHeaderModel.Email = this.newAgreementForm.value.emailNotification;

    this.tradeAgreementDetailService.saveAgreementHeader(this.newAgreementDetailHeaderModel).subscribe(
      data => {
        this._common._setLoading(false);
        this.lastConciliationModal();
      },
      () => {

      });
  }

  public lastConciliationModal() {

    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'El acuerdo a pasado a estado conciliado',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 3000);
  }

  getKeyStatus() {
    this.catalogModel.Search_Key = this.search_key;
    this._common.listCatalog(this.catalogModel).subscribe(
      dataF => {
        this.fk_Status_Agreement = dataF[0].pk_Glb_Cat_Catalog;
        this.listProvider(this.option);
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
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

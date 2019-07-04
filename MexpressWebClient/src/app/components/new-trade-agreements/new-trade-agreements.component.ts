import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-trade-agreements',
  templateUrl: './new-trade-agreements.component.html',
  styleUrls: ['./new-trade-agreements.component.scss']
})
export class NewTradeAgreementsComponent implements OnInit {
  newAgreementForm: FormGroup;
  showErrors = false;
  type_of_agreement: any;
  provider: any;

  constructor() { }

  ngOnInit() {

    this.newAgreementForm = new FormGroup({
      agreement_name: new FormControl('', [Validators.required]),

     });
  }

  behaviorTypeOfAgreement(value: any){


  }

  behaviorProvider(value: any){


  }

  uploadArchive(){

    
  }

}

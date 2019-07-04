import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-trade-agreements',
  templateUrl: './trade-agreements.component.html',
  styleUrls: ['./trade-agreements.component.scss']
})
export class TradeAgreementsComponent implements OnInit {

  constructor(private router: Router, private _common: CommonService) { }

  ngOnInit() {
  }

  redirectPageCreateNewAgreement(){
    this.router.navigate(["newTradeAgreements"]);
    this._common.asignHeaderTitle("Nuevo acuerdo comercial");

  }
}

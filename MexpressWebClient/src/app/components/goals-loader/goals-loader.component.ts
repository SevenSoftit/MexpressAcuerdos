import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TradeAgreementDetailService } from 'src/app/services/tradeAgreementDetail/tradeAgreementDetail.service';

@Component({
  selector: 'app-goals-loader',
  templateUrl: './goals-loader.component.html',
  styleUrls: ['./goals-loader.component.scss']
})
export class GoalsLoaderComponent implements OnInit {
  goalLine = [];
  goalLineCounter = 0;
  pk_Ac_Trade_Agreement: number;
  constructor(@Inject(MAT_DIALOG_DATA) public params, public tradeAgreementDetailService: TradeAgreementDetailService) {

    this.pk_Ac_Trade_Agreement = params.pk_Ac_Trade_Agreement;
    this.getGoalByAgreement();
  }

  ngOnInit() {

  }
  addNewGoal() {
    var objGoalLine = {
      pk_Ac_Trade_Agreement: 0,
      date_Start: new Date(),
      date_Finish: new Date(),
      goal_Amount: '',
      type_Goal: false,
      pk_Cat_Currency: 1,
      bonus: 0,
      id: this.goalLineCounter

    }
    this.goalLine.push(objGoalLine);
  }

  getGoalByAgreement() {
    var agreementGoal = { Pk_Ac_Trade_Agreement: this.pk_Ac_Trade_Agreement };
    this.tradeAgreementDetailService.ListAgreementGoals(agreementGoal).subscribe(
      data => {
        this.goalLine = data.data;
        console.log(data);
      },
      error => {
      });
  }

  deleteGoal(goal) {
    goal.active = false;
  }

  saveGoals() {
    console.log(this.goalLine);
    this.tradeAgreementDetailService.saveAgreementGoals(this.goalLine).subscribe(
      data => {

        console.log(data);
      },
      error => {
      });
  }


}

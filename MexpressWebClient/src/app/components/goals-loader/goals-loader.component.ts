import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { TradeAgreementDetailService } from "src/app/services/tradeAgreementDetail/tradeAgreementDetail.service";
import { utiles } from "src/environments/utiles";
import { AllMoneyService } from "src/app/services/allMoney/allMoney.service";
import { MoneyModel } from "src/app/models/money.model";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";
import { CommonService } from "src/app/services/common/common.service";
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';

@Component({
  selector: "app-goals-loader",
  templateUrl: "./goals-loader.component.html",
  styleUrls: ["./goals-loader.component.scss"]
})
export class GoalsLoaderComponent implements OnInit {
  goalLine = [];
  goalLineDelete = [];
  goalLineCounter = 0;
  pk_Ac_Trade_Agreement: number;
  moneyList: any = [];
  minDate = new Date();
  followUp: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public params,
    public tradeAgreementDetailService: TradeAgreementDetailService,
    private allMoneyService: AllMoneyService,
    public dialogRefGoal: MatDialogRef<GoalsLoaderComponent>,
    private matDialog: MatDialog,
    private commonService: CommonService
  ) {
    this.pk_Ac_Trade_Agreement = params.pk_Ac_Trade_Agreement;
    this.followUp = params.is_in_follow_up;
    this.listMoney();
    this.getGoalByAgreement();
  }

  ngOnInit() {}
  addNewGoal() {
    var objGoalLine = {
      pk_Cat_Agreement_Goals: Math.floor(Math.random() * -100) + -1,
      pk_Ac_Trade_Agreement: this.pk_Ac_Trade_Agreement,
      date_Start: new Date(),
      date_Finish: new Date(),
      goal_Amount: "",
      type_Goal: false,
      pk_Cat_Currency: 1,
      name_Currency: "COLONES",
      bonus: 0,
      id: this.goalLineCounter,
      Creation_User: utiles.getInfoUser().username,
      Modification_User: utiles.getInfoUser().username,
      errorGoal: false,
      errorBonus: false,
      errorFinishDate: false
    };

    this.goalLine.push(objGoalLine);
  }

  getGoalByAgreement() {
    var agreementGoal = { Pk_Ac_Trade_Agreement: this.pk_Ac_Trade_Agreement };
    this.tradeAgreementDetailService
      .ListAgreementGoals(agreementGoal)
      .subscribe(
        data => {
          this.goalLine = data.data;

          this.goalLine.forEach(element => {
            element.Modification_User = utiles.getInfoUser().username;
          });
        },
        error => {}
      );
  }

  deleteGoal(goal) {
    const dataConfirm = {
      labelTitile: "¿Realmente deseas eliminar la meta?",
      header: "",
      textDescriptionStart: "Al eliminar una meta perderás su información.",
      firstCustomLabel: "Esta acción no se puede deshacer.",
      textDescriptionMiddle: "Para continuar eliminando, haz click en el botón",
      secondCustomLabel: "Eliminar, ",
      textDescriptionEnd: "para volver, haz click en",
      finalCustomLabel: "Cancelar.",
      status: false,
      clickFunction: "deleteEvidenceArchive"
    };

    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        confirmInfo: dataConfirm,
        evidence: { pk_Cat_Document_Agreement: 0 }
      },
      minWidth: "800px",
      maxWidth: "800px",
      maxHeight: "300px",
      minHeight: "300px"
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe(data => {
      goal.active = false;
      this.goalLineDelete.push(goal);

      this.goalLine = this.goalLine.filter(
        g => g.pk_Cat_Agreement_Goals != goal.pk_Cat_Agreement_Goals
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  saveGoals() {
    var error = false;
    this.goalLine.forEach(element => {
      var startDate = new Date(element.date_Start);
      var endDate= new Date(element.date_Finish);
      if (element.goal_Amount == "" || element.goal_Amount == null) {
        element.errorGoal = true;
        error = true;
      }

      if (element.bonus == "" || element.bonus == null) {
        element.errorBonus = true;
        error = true;
      }
      
      if (endDate.getTime()< startDate.getTime()){
        element.errorFinishDate = true;
        error = true;
      }

    });

    if (!error) {
      this.closeModal(true);
      this.goalLineDelete.forEach(element => {
        this.goalLine.push(element);
      });

      this.goalLine.forEach(element => {
        element.pk_Cat_Currency = this.moneyList.filter(
          m => m.name_Currency == element.name_Currency
        )[0].id_Currency;
      });

      this.tradeAgreementDetailService
        .saveAgreementGoals(this.goalLine)
        .subscribe(data => {}, error => {});
    } else {
      const datafailed = {
        labelTitile: '¡Atención!',
        icon: 'warning',
        textDescription: 'Las metas tienen campos con información incorrecta.',
        status: 'warning'
      };
  
      const dialogRef = this.matDialog.open(FeedbackModalComponent, {
        data: { contactInfo: datafailed },
        minWidth: '500px', maxWidth: '500px', maxHeight: '250px', minHeight: '250px'
      });
    setTimeout(() => dialogRef.close(), 3000);
    }
  }

  closeModal(value) {
    this.dialogRefGoal.close(value);
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
    let moneyModel: MoneyModel = new MoneyModel();

    this.allMoneyService.listMoney(moneyModel).subscribe(
      dataS => {
        this.moneyList = dataS;
      },
      error => {}
    );
  }

  valueChange(goal, value) {
    if (value) goal.errorGoal = false;
    else goal.errorBonus = false;
  }

  changeFinishDate(event){
    this.goalLine.forEach(element =>{
      var startDate = new Date(element.date_Start);
      var endDate= new Date(element.date_Finish);
      if (endDate.getTime() >= startDate.getTime()){
        element.errorFinishDate = false;
      }else {
        element.errorFinishDate = true;

      }
    })
  }
}

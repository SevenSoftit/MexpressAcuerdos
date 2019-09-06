import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeModel } from './home.Model';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { DashboardResumeService } from 'src/app/services/dashboardResume/dashboardResume.service';
import { utiles } from 'src/environments/utiles';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //#region Variables

  listDashboard: any;
  inProcessAgreementsCount: any;
  finishedAgreementsCount: any;
  conciledAgreementsCount: any;
  expiredAgreementsCount: any;
  activeAgreementsCount: any;
  inactiveAgreementsCount: any;
  actualMonth: any;
  hasAuth: any;

  //#endregion Variables

  //#region Model
  homeModel: HomeModel = new HomeModel();
  //#endregion Model


  constructor(private dashboardResumeService: DashboardResumeService, public dialog: MatDialog, private router: Router,
    private _common: CommonService) {
 if(utiles.getInfoUser()!== null && utiles.getInfoUser() !== undefined){
    var infoUser = utiles.getInfoUser();
    infoUser.Fk_Glb_Mtr_Head = 0;
    localStorage.setItem('authorizationData', JSON.stringify(infoUser));
    this._common._setLoading(false);
  } else {
    this.router.navigate(['login']);
  }
  }

  ngOnInit() {
    // setTimeout(() => {
       this._common._setLoading(true);
    // }, 0, 5000);

    if (utiles.getInfoUser() !== null && utiles.getInfoUser() !== undefined) {
      this.hasAuth = utiles.getInfoUser().Posee_Autenticacion;
      this._common._setLoading(false);
    }
    if (this.hasAuth == "True") {
    this.listAgreements();
  } else {
    this.router.navigate(["login"]);
  }
  }

  /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 03/07/2019
  * Description: method that gets the data for dashboard list
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:
  --------------------------------------------------------------------*/
  listAgreements() {
    this.dashboardResumeService.ListAgreementsDashboardResume(this.homeModel).subscribe(
      dataQ => {
        this.listDashboard = dataQ;
        this.inProcessAgreementsCount = this.listDashboard[0].in_Process_Agreements_Count;
        this.finishedAgreementsCount = this.listDashboard[0].finished_Agreements_Count;
        this.conciledAgreementsCount = this.listDashboard[0].conciled_Agreements_Count;
        this.expiredAgreementsCount = this.listDashboard[0].expired_Agreements_Count;
        this.activeAgreementsCount = this.listDashboard[0].active_Agreements_Count;
        this.inactiveAgreementsCount = this.listDashboard[0].inactive_Agreements_Count;
        this.actualMonth = this.listDashboard[0].actual_Month;

        this._common._setLoading(false);  
      },
      error => {
        this._common._setLoading(false);
        console.log('no se envio' + ' ' + error);
      });

  }

  RedirectPageInactiveAgreements() {
       this._common._setLoading(true);
       const active_Agreements = {
        info: false
      }
 
        var navigationExtras: NavigationExtras = {
          queryParams: {
            'active_Agreements': JSON.stringify(active_Agreements)
          },
          skipLocationChange: true

        };

        this.router.navigate(["agreementTracking"], navigationExtras);
        this._common.asignHeaderTitle("Seguimiento del acuerdo");

        this._common._setLoading(false);
  }


  redirectToAgreementTracking() {
    this.router.navigate(["agreementTracking"]);
    this._common.asignHeaderTitle("Seguimiento del acuerdo");

  }
}

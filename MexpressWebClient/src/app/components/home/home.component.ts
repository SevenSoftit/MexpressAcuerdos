import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeModel } from './home.Model';
import { Router, NavigationExtras } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { DashboardResumeService } from 'src/app/services/dashboardResume/dashboardResume.service';
import { utiles } from 'src/environments/utiles';
import { CatalogModel } from '../common-model/catalog.Model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //#region Variables

  listDashboard: any;

  activeAgreementsCount: any;
  actualMonth: any;
  hasAuth: any;

  //#endregion Variables

  //#region Model
  homeModel: HomeModel = new HomeModel();
  catalogModel: CatalogModel = new CatalogModel();
  //#endregion Model


  constructor(private dashboardResumeService: DashboardResumeService, public dialog: MatDialog, private router: Router,
    private _common: CommonService) {
//  if(utiles.getInfoUser()!== null && utiles.getInfoUser() !== undefined){
//     var infoUser = utiles.getInfoUser();
//     infoUser.Fk_Glb_Mtr_Head = 0;
//     localStorage.setItem('authorizationData', JSON.stringify(infoUser));
//     this._common._setLoading(false);
//   } else {
//     this.router.navigate(['login']);
//   }
  }

  ngOnInit() {
  //   // setTimeout(() => {
  //      this._common._setLoading(true);
  //   // }, 0, 5000);

  //   if (utiles.getInfoUser() !== null && utiles.getInfoUser() !== undefined) {
  //     this.hasAuth = utiles.getInfoUser().Posee_Autenticacion;
  //     this._common._setLoading(false);
  //   }
  //   if (this.hasAuth == "True") {
  //   this.listPaySlips();
  // } else {
  //   this.router.navigate(["login"]);
  // }
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
  listPaySlips() {
    // this.dashboardResumeService.ListErDashboardResume(this.homeModel).subscribe(
    //   dataQ => {
    //     this.listDashboard = dataQ;

    //     this.activeErCount = this.listDashboard[0].active_Er_Count;
    //     this.revisionErCount = this.listDashboard[0].revision_Er_Count;
    //     this.rejectedErCount = this.listDashboard[0].rejected_Er_Count;
    //     this.finishedErCount = this.listDashboard[0].finished_Er_Count;
    //     this.specialErCount = this.listDashboard[0].special_Er_Count;
    //     this.inactiveErCount = this.listDashboard[0].inactive_Er_Count;
    //     this.collaboratorCount = this.listDashboard[0].collaborator_Count;
    //     this.groupCount = this.listDashboard[0].group_Count;
    //     this.actualMonth = this.listDashboard[0].actual_Month;

    //     this._common._setLoading(false);
    //   },
    //   error => {
    //     this._common._setLoading(false);
    //     console.log('no se envio' + ' ' + error);
    //   });

  }

  RedirectPage(key) {

    //    this._common._setLoading(true);
 
    // this.catalogModel.Search_Key = key;
    // this._common.listCatalog(this.catalogModel).subscribe(
    //   dataF => {
    //     var navigationExtras: NavigationExtras = {
    //       queryParams: {
    //         'pk_Glb_Cat_Catalog': dataF[0].pk_Glb_Cat_Catalog
    //       },
    //       skipLocationChange: true

    //     };

    //     this.router.navigate(["allEmployeeRoster"], navigationExtras);
    //     this._common.asignHeaderTitle("Todas las planillas");

    //     this._common._setLoading(false);
    //   },
    //   error => {
    //     this._common._setLoading(false);
    //     console.log('no se envio' + ' ' + error);
        

    //   });
  }


  redirectCollaborators() {
    // this.router.navigate(["manageEmployee"]);
    // this._common.asignHeaderTitle("Gestión de empleados");

  }

  redirectGroups() {
    // this.router.navigate(["allGroups"]);
    // this._common.asignHeaderTitle("Todos los centros de costo");

  }

}

import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { CommonService } from "../../../services/common/common.service";
import { utiles } from "src/environments/utiles";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-sidebar-left",
  templateUrl: "./sidebar-left.component.html",
  styleUrls: ["./sidebar-left.component.scss"]
})
export class SidebarLeftComponent implements OnInit {
  isMenuOpen = true;
  isOptionOpen = false;
  menuOptions = [];
  activeOption = "home";
  hasAuth: any;
  @Output() collapseMenu = new EventEmitter<any>();
  @Input() sccsLeft: string = "content-with-left-open";
  @Input() sccsContent: string = "content-with-content-open";
  actualUser: any;

  constructor(private _common: CommonService, private router: Router) {}

  ngOnInit() {
    if (utiles.getInfoUser()!== null && utiles.getInfoUser()!== undefined){
      this.hasAuth = utiles.getInfoUser().Posee_Autenticacion;
      this._common._setLoading(false);
    }
    if(this.hasAuth === 'True'){
    this._common.asignHeaderTitle("Inicio");
    var user = utiles.getInfoUser();

    const menu = utiles.getInfoMenu();
    if (menu !== undefined && menu !== null) {
      this.menuOptions = menu[0].MenuAplicacion;
    }

    var that = this;
    this.menuOptions.forEach(function(item) {
      item.OpcionMenu.forEach(function(itemOp) {
        if (itemOp.Url == user.uriStartPage) that.activeOption = itemOp.Url;
      });
    });

    this.sccsContent = "content-with-content-open";
    this.sccsLeft = "content-with-left-open";

    this.actualUser = user.username;
    this._common._setLoading(false);
  }else {
      this.router.navigate(['login']);
     }
  }

  /*******************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
   * Description: method that change the value of isMenuOpen variable,
   * and set the value false to collapse the sidenav menu
   ****************************************************
   * Modifications
   ****************************************************
   * Number:
   * Date:
   * Ticket:
   * Author:
   * Description:
   *******************************************************/
  onCollapseMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.collapseMenu.emit(this.isMenuOpen);
  }
  collapseOption() {
    this.isMenuOpen = !this.isOptionOpen;
  }

  /*******************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
   * Description: method that redirect to the component for each option
   ****************************************************
   * Modifications
   ****************************************************
   * Number:
   * Date:
   * Ticket:
   * Author:
   * Description:
   *******************************************************/
  goMenuOption(option) {
    this.activeOption = option;
    const projects = {
      phase: option,
      months: 0
    };
    const navigationExtras: NavigationExtras = {
      queryParams: {
        projects: JSON.stringify(projects)
      },
      skipLocationChange: true
    };
    
    switch (option) {
      case "home": {
        this.router.navigate(["home"]);
        this._common.asignHeaderTitle("Inicio");
        break;
      }
      case "acc": {
        this.router.navigate(["tradeAgreements"]);
        this._common.asignHeaderTitle("Acuerdos comerciales");
        break;
      }
      case "sda": {
        this.router.navigate(["agreementTracking"]);
        this._common.asignHeaderTitle("Seguimiento del acuerdo");
        break;
      }
      case "cda": {
        this.router.navigate(["agreementConciliation"]);
        this._common.asignHeaderTitle("Conciliación de acuerdos");
        break;
      }
      case "": {
        this.router.navigate(["home"]);
        break;
      }
    }
  }
}

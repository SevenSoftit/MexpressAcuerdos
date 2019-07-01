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
   * Author: Eduardo Salas
   * Creation date: 05/02/2019
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
   * Author: Eduardo Salas
   * Creation date: 05/02/2019
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
      case "ater": {
        this.router.navigate(["allEmployeeRoster"]);
        this._common.asignHeaderTitle("Todas las planillas");
        break;
      }
      case "my_pending_employee_rosters": {
        this.router.navigate(["my_pending_employee_rosters"]);
        this._common.asignHeaderTitle("Mis planillas pendientes");

        break;
      }
      case "merr": {
        this.router.navigate(["my_employee_rosters_review"]);
        this._common.asignHeaderTitle("Mis planillas en revisión");

        break;
      }
      case "fer": {
        this.router.navigate(["finishedEmployeeRoster"]);
        this._common.asignHeaderTitle("Mis planillas finalizadas");

        break;
      }
      case "atg": {
        this.router.navigate(["allGroups"]);
        this._common.asignHeaderTitle("Todos los centros de costo");

        break;
      }
      case "doer": {
        this.router.navigate(["employeeRosterDef"]);
        this._common.asignHeaderTitle("Definición de planillas");

        break;
      }
      case "mc": {
        this.router.navigate(["manage_concepts"]);
        this._common.asignHeaderTitle("Gestión de conceptos");

        break;
      }
      case "me": {
        this.router.navigate(["manageEmployee"]);
        this._common.asignHeaderTitle("Gestión de empleados");

        break;
      }
      case "review_of_employee_rosters": {
        this.router.navigate(["review_of_employee_rosters"]);
        this._common.asignHeaderTitle("Planillas pendientes por revisar");

        break;
      }
      case "rprts": {
        this.router.navigate(["reports"]);
        this._common.asignHeaderTitle("Generación de reportes");

        break;
      }
      case "": {
        this.router.navigate(["home"]);
      }
    }
  }
}

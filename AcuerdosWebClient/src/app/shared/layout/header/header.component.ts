import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { utiles } from 'src/environments/utiles';
import { CommonService } from '../../services/common/common.service';
import { AuthService } from '../../services/auth/auth.service';
import { ChangePasswordModalComponent } from '../../modal/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  test = 35;
  menuOptions: any;
  title: any;
  hasAuth: any;
  constructor(private router: Router, private matDialog: MatDialog, private _common: CommonService,  private authService: AuthService) { }

  ngOnInit() {
    if (utiles.getInfoUser()!== null && utiles.getInfoUser()!== undefined){
      this.hasAuth = utiles.getInfoUser().Posee_Autenticacion;
      this._common._setLoading(false);
    }
    if(this.hasAuth === 'True'){
    this._common.moduleName.subscribe(data => {
      this.title = data;
      this._common._setLoading(false);
    });
    const menu = utiles.getInfoMenu();
    if (menu !== undefined && menu !== null) {
      const options = menu[0].MenuAplicacion;
      const menuOpt = options.filter(element => {
        this._common._setLoading(false);
        return element.Ubicacion === 'Menu.Top';
      });

      this.menuOptions = menuOpt[0].OpcionMenu.filter(element => {
        this._common._setLoading(false);
        return element.Ubicacion === 'Menu.Top';
      });
      this._common._setLoading(false);
    }
  }else {
    this.router.navigate(['login']);
   }
  }

  /*******************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
  * Description: Method that redirect the user to the quick add project component
  ****************************************************
  * Modifications
  ****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:
*******************************************************/

  optionSelected(optName) {
    switch (optName) {
      case 'change-password':
      this.changePassword();
        break;

      case 'LogOut':
        this.logOut();
        break;
    }
  }

  changePassword() {
      this.matDialog.open(ChangePasswordModalComponent, {
      minWidth: "650px",
      maxWidth: "650px",
      maxHeight: "438px",
      minHeight: "438px"
    });
  }

  logOut() {
    utiles.clearCache();
    this.router.navigate(['login']);
    this.authService.setLoggedIn(false);
  }
}

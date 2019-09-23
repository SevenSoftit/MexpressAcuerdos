import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { utiles } from '../../../environments/utiles'
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginModel } from 'src/app/models/login.Model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region variables
  /*********************************************************************
   * Author: Gustavo ZC
   * Creation date: 02/07/2019 
   *********************************************************************/
  loginForm: FormGroup;
  loginModel: LoginModel = new LoginModel();


  submitted = false;
  loading = false;
  hide = true;

  //#region variables

  //#region constructor
  /*********************************************************************
   * Author: Gustavo ZC
   * Creation date: 02/07/2019
   *********************************************************************/
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService,
    private _common: CommonService, private matDialog: MatDialog, private authService: AuthService) { }
  //#endregion constructor


  //#region methods
  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])]
    });

    this._common._setLoading(false);
    this._common.loadingService.subscribe(data => { 
      this.loading = data;
    });

  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019 
    * Description:
   * ***********************************************************************************
    * Modifications
   * ***********************************************************************************
    * Number:
    * Date:
    * Ticket:
    * Author: 
    * Description:
  **************************************************************************************/
  login() {
    this.submitted = true;
   
    if (!this.loginForm.valid) {
        this._common._setLoading(false);
    } else {

      this.loginModel.Username = this.loginForm.get('username').value;
      this.loginModel.Password = this.loginForm.get('password').value;
      setTimeout(() => {
        this._common._setLoading(true);
      }, 0, 5000);
      this.loginService.login(this.loginModel).subscribe(
        data => {
          this.loginModel = data;
          utiles.createCacheUser(this.loginModel);
          utiles.createInfoMenu(JSON.parse(this.loginModel.roleList));
  
          if (this.loginModel.Posee_Autenticacion == "True") {

            this.loginModel.Rol_List = JSON.parse(this.loginModel.roleList);
            this.loginModel.Ubication_List = JSON.parse(this.loginModel.Ubicacion);

            // if(this.loginModel.Ubication_List.length <= 0 && this.loginModel.Rol_List[0].Pk_Rol != '19'){
            //   this._common._setLoading(false);
            //   this.modalUserNotAssigned();    
            //   return;
            // }

            this.loginService.loginLocalApi(this.loginModel).subscribe(
              data => {
                utiles.createCacheAuthorizationClient(data.value);

                if (this.loginModel !== undefined || this.loginModel != null) {
                  this.loginModel.roleList = JSON.parse(this.loginModel.roleList);
                  this._common.asignMenu(JSON.stringify(this.loginModel.roleList));
                }
                this.router.navigate([this.loginModel.uriStartPage]);
                this.authService.setLoggedIn(true);
                this._common._setLoading(false);
              },
              error => {
                this._common._setLoading(false);
                return console.error(error);
              }
            )
          }
          else {
            if (this.loginModel !== undefined || this.loginModel != null) {
              this.loginModel.roleList = JSON.parse(this.loginModel.roleList);
              this._common.asignMenu(JSON.stringify(this.loginModel.roleList));
            }

            this.router.navigate([this.loginModel.uriStartPage]);
            this.authService.setLoggedIn(true);
            this._common._setLoading(false);
          }        
        },
        () => {
          this._common._setLoading(false);
          
        }
      )
    }
  }


  forgotPassword(): void {
    this.router.navigate(['forgotPassword']);
  }

    /***********************************************************************************
  * Author: Gustavo ZC
  * Creation date: 02/07/2019
  * Description:
 * ***********************************************************************************
  * Modifications
 * ***********************************************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:
**************************************************************************************/
public modalUserNotAssigned() {

  const dataSuccess = {
    icon: 'warning',
    labelTitile: '¡Atención!',
    textDescription: 'El usuario no se encuentra asignado a ninguna tienda',
    // btnClose: 'Cerrar',
    status: 'warning'
  };

  const dialogRef = this.matDialog.open(FeedbackModalComponent, {
    data: { contactInfo: dataSuccess },
    minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
  });
  setTimeout(() => dialogRef.close(), 3000);
}
  //#region methods
}

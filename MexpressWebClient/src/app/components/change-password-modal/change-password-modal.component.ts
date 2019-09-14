import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from 'src/environments/environment';
import {utiles} from "../../../environments/utiles"
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { LoginModel } from 'src/app/models/login.Model';

@Component({
  selector: "app-change-password-modal",
  templateUrl: "./change-password-modal.component.html",
  styleUrls: ["./change-password-modal.component.scss"]
})
export class ChangePasswordModalComponent implements OnInit {
  //#region Variables
  private unsubscribe$ = new Subject<void>();
  changePassForm: FormGroup;
  submitted = false;
  showPassError = false;
  loginModel: LoginModel = new LoginModel();
  //#endregion Variables

  constructor(private commonService: CommonService,private matDialog: MatDialog, public matDialogRef: MatDialogRef<ChangePasswordModalComponent>) { }

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
  ngOnInit() {
    this.changePassForm = new FormGroup({
      actual_pass: new FormControl("", [Validators.required]),
      new_pass: new FormControl("", [Validators.required]),
      confirm_pass: new FormControl("", [Validators.required])
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
  changePass() {

    const dataSuccess = {
      labelTitile: '¡Listo!',
      icon: 'check_box',
      textDescription: 'Los datos se cambiaron correctamente',
      status: 'success'
    };

    if (this.changePassForm.status === "INVALID") {
      this.submitted = true;
    } else {
      if (
        this.changePassForm.value.new_pass !==
        this.changePassForm.value.confirm_pass
      ) {
        this.showPassError = true;
      } else {
        this.showPassError = false;
        
        this.loginModel.Contrasena = this.changePassForm.value.new_pass;
        this.loginModel.ContrasenaActual = this.changePassForm.value.actual_pass;
        this.loginModel.Username = utiles.getInfoUser().username;
        this.loginModel.OpcionUser = environment.ChangeCurrentPassword;
        this.loginModel.pk_Usuario = utiles.getInfoUser().pk_Usuario;
        this.loginModel.Fk_Sistema = utiles.getInfoUser().fk_Sistema;

        this.commonService._OptionsUser(this.loginModel)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.submitted = false;

            const dialogRef = this.matDialog.open(FeedbackModalComponent, {
              data: { contactInfo: dataSuccess },
              minWidth: '437px', maxWidth: '437px', maxHeight: '248px', minHeight: '248px'
            });
            this.closeModalChangePassword();
           setTimeout(() => dialogRef.close(), 3000);
          },
          error => {
            this.commonService._setLoading(false);
            return console.error(error);
          }
        )
      }
    
    }
  }

  closeModalChangePassword() {
    this.matDialogRef.close();
  }

  ngOnDestroy()
  {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

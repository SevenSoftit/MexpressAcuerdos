import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ForgotModel } from 'src/app/models/forgot-password.Model';

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  //#region variables
  forgotPasswordForm: FormGroup;
  email: any;
  submitted = false;

  forgotModel: ForgotModel = new ForgotModel();
  //#endregion variables
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, public dialog: MatDialog) { }

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
    this.forgotPasswordForm = this.fb.group({
      username: ["", Validators.compose([Validators.required, Validators.email])]
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
  sendRequest() {
    this.submitted = true;
    if (!this.forgotPasswordForm.valid) {
    } else {
      this.forgotModel.Username = this.forgotPasswordForm.value.username;
      this.forgotModel.OpcionUser = environment.ForgotPassword;

      this.commonService._OptionsUser(this.forgotModel).subscribe(
        data => {
          this.openDialog();
        },
        error => {
          this.commonService._setLoading(false);
          return console.error(error);
        }
      )

    }
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
  goLogin() {
    this.router.navigate(['login']);
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
  openDialog(): void {
    const dataSuccess = {
      labelTitile: '¡Listo!',
      icon: 'check_box',
      textDescription: 'La solicitud fue enviada correctamente',
      status: 'success'
    };
    let dialogRef = this.dialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '437px', maxWidth: '437px', maxHeight: '248px', minHeight: '248px'
    })

    setTimeout(() => dialogRef.close(), 3000);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['login']);
    });
  }
}

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    SharedModule
  ]
})
export class ForgotPasswordModule { }

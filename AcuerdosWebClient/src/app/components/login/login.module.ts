import { NgModule } from '@angular/core';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { SharedModule } from 'src/app/shared-module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule
  ],
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule } from 'src/app/shared/loading/loading.module';

const routes: Routes = [{ path: '', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    // NgxLoadingModule.forRoot({}),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule,
    LoadingModule
  ]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // NgxLoadingModule.forRoot({}),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule,
    LoadingModule
  ],
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsLoaderComponent } from './goals-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [GoalsLoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ScrollingModule,
    MatSlideToggleModule,
    MatSelectModule
  ]
})
export class GoalsLoaderModule { }
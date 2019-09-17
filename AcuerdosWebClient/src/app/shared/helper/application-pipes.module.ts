import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FilterPipe } from './helperfilter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterPipe
  ],
  exports: [
    FilterPipe
  ]
})
export class ApplicationPipesModule { }
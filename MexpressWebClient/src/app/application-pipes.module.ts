import { FilterPipe } from 'src/app/helperfilter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

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
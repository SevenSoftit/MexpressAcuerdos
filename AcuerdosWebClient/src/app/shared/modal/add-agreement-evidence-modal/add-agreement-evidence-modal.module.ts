import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DropzoneModule } from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared-module';

@NgModule({
  declarations: [],
  imports: [  
    DropzoneModule,  
    SharedModule
  ],
  exports: [
    RouterModule
  ],
})
export class AddEvidenceModalModule { }

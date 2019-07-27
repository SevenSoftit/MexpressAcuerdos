import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DropzoneModule } from 'ngx-dropzone-wrapper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddAgreementEvidenceModalComponent } from './add-agreement-evidence-modal.component';
const routes: Routes = [
  { path: '', component: AddAgreementEvidenceModalComponent },

];

@NgModule({
  declarations: [AddAgreementEvidenceModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropzoneModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    RouterModule
  ],
})
export class AddEvidenceModalModule { }

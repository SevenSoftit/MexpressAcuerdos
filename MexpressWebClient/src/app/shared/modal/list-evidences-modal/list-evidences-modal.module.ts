import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'; 
import { Routes, RouterModule } from '@angular/router';
import { ListEvidencesModalComponent } from './list-evidences-modal.component';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: ListEvidencesModalComponent },

];
@NgModule({
  declarations: [ListEvidencesModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
})
export class ListEvidencesModalModule { }

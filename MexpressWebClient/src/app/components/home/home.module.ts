import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from "./home.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule,
     MatDialogModule,
      FormsModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatMomentDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule
    ],
  declarations: [HomeComponent],
  exports: [
    RouterModule,
  ],
  entryComponents: []
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeAgreementsComponent } from './trade-agreements.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TradeAgreementsComponent },

];
@NgModule({
  declarations: [TradeAgreementsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ScrollDispatchModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TradeAgreementsModule { }

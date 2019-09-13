import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FeedbackModalComponent } from './feedback-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { FeedbackModalComponent } from './feedback-modal.component';

@NgModule({
  declarations: [FeedbackModalComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class FeedbackModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FeedbackDescriptionModalComponent } from './feedback-description-modal.component';
//import { FeedbackDescriptionModalComponent } from './feedback-description-modal.component';

@NgModule({
  declarations: [FeedbackDescriptionModalComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class FeedbackDescriptionModalModule { }

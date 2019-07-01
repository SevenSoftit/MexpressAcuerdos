import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
//#region Variables
icon: any;
labelTitile: any;
textDescription: any;
status: any;

  //#endregion Variables
  constructor(@Inject(MAT_DIALOG_DATA) public dataSuccess: any) {
    if (this.dataSuccess !== null && this.dataSuccess !== undefined) {
      this.labelTitile = this.dataSuccess.contactInfo.labelTitile;
      this.icon = this.dataSuccess.contactInfo.icon;
      this.textDescription = this.dataSuccess.contactInfo.textDescription;
      this.status = this.dataSuccess.contactInfo.status;
    }
  }

  ngOnInit() {
  }

}

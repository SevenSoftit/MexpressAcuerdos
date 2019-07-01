import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-description-modal',
  templateUrl: './feedback-description-modal.component.html',
  styleUrls: ['./feedback-description-modal.component.scss']
})
export class FeedbackDescriptionModalComponent implements OnInit {

  //#region Variables
icon: any;
labelTitile: any;
textDescription: any;
btnClose: any;
status: any;


  //#endregion Variables
  constructor(@Inject(MAT_DIALOG_DATA) public dataSuccess: any) {
    if (this.dataSuccess !== null && this.dataSuccess !== undefined) {
      this.icon = this.dataSuccess.contactInfo.icon;
      this.labelTitile = this.dataSuccess.contactInfo.labelTitile;      
      this.textDescription = this.dataSuccess.contactInfo.textDescription;
      this.btnClose = this.dataSuccess.contactInfo.btnClose;
      this.status = this.dataSuccess.contactInfo.status;

    }
  }

  ngOnInit() {
  }

}

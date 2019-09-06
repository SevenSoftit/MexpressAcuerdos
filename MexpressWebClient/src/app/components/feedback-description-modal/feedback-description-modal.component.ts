import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
btnAccept: any;
btnCancel: any;
status: any;
onAdd = new EventEmitter();

  //#endregion Variables
  constructor(@Inject(MAT_DIALOG_DATA) public dataSuccess: any, public matDialogRef: MatDialogRef<FeedbackDescriptionModalComponent>) {
    if (this.dataSuccess !== null && this.dataSuccess !== undefined) {
      this.icon = this.dataSuccess.contactInfo.icon;
      this.labelTitile = this.dataSuccess.contactInfo.labelTitile;      
      this.textDescription = this.dataSuccess.contactInfo.textDescription;
      this.btnAccept = this.dataSuccess.contactInfo.btnAccept;
      this.btnCancel = this.dataSuccess.contactInfo.btnCancel;
      this.status = this.dataSuccess.contactInfo.status;

    }
  }

  ngOnInit() {
  }

  acceptFinalization(){  
    this.onAdd.emit(true);
    this.closeConfirm(true);  
  }

  cancel(){  
    this.onAdd.emit(false); 
    this.closeConfirm(true); 
  }

  closeConfirm(value) {
    this.matDialogRef.close(value);
  }

}

import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { utiles } from 'src/environments/utiles';
import { AgreementDocumentModel } from 'src/app/models/agreementDocument.model';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
//#region Model

//#endregion Model
//#region Variables
labelTitile: any;
header: any;
textDescriptionStart: any;
firstCustomLabel: any;
textDescriptionMiddle: any;
secondCustomLabel: any;
textDescriptionEnd: any;
finalCustomLabel: any;
clickFunctions: any;
agreementDocumentModel: AgreementDocumentModel = new AgreementDocumentModel();


onAdd = new EventEmitter();
//#endregion Variables

  constructor(private evidenceService: EvidenceService, @Inject(MAT_DIALOG_DATA) public dataConfirm: any,
    public dialog: MatDialogRef<ConfirmModalComponent>, private commonService: CommonService) {
    if (this.dataConfirm !== null && this.dataConfirm !== undefined) {
      this.labelTitile = this.dataConfirm.confirmInfo.labelTitile;
      this.header = this.dataConfirm.confirmInfo.header;
      this.textDescriptionStart = this.dataConfirm.confirmInfo.textDescriptionStart;
      this.firstCustomLabel = this.dataConfirm.confirmInfo.firstCustomLabel;
      this.textDescriptionMiddle = this.dataConfirm.confirmInfo.textDescriptionMiddle;
      this.secondCustomLabel = this.dataConfirm.confirmInfo.secondCustomLabel;
      this.textDescriptionEnd = this.dataConfirm.confirmInfo.textDescriptionEnd;
      this.finalCustomLabel = this.dataConfirm.confirmInfo.finalCustomLabel;
      this.clickFunctions = this.dataConfirm.confirmInfo.clickFunction;
    }
  }

  ngOnInit() {
   
  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 05/08/2019
     * Description: 
    * ***********************************************************************************
     * Modifications
    * ***********************************************************************************
     * Number:
     * Date:
     * Ticket:
     * Author:
     * Description:
  **************************************************************************************/
 deleteEvidenceArchive(){

    this.commonService._setLoading(true);
if(this.dataConfirm.evidence.pk_Cat_Document_Agreement > 0 && this.dataConfirm.evidence.pk_Cat_Document_Agreement != undefined)
{
  this.agreementDocumentModel.Pk_Cat_Document_Agreement = this.dataConfirm.evidence.pk_Cat_Document_Agreement;
  this.agreementDocumentModel.Pk_Ac_Trade_Agreement = this.dataConfirm.evidence.pk_Ac_Trade_Agreement;
  this.agreementDocumentModel.Modification_User = utiles.getInfoUser().username;
  this.agreementDocumentModel.Archive_Original_Name = this.dataConfirm.evidence.archive_Original_Name;
  this.agreementDocumentModel.Archive_New_Name = this.dataConfirm.evidence.archive_New_Name;
  this.agreementDocumentModel.File_Description = this.dataConfirm.evidence.file_Description;
  this.agreementDocumentModel.Name_Agreement = this.dataConfirm.evidence.name_Agreement;
  this.agreementDocumentModel.Active = false;

  this.evidenceService.deleteEvidence(this.agreementDocumentModel).subscribe(
    data => {
      this.closeConfirm(true);     
      this.onAdd.emit(true);
      this.commonService._setLoading(false);
    },
    error => {
    this.commonService._setLoading(false);
    });
}else{
  this.closeConfirm(true);         
  this.onAdd.emit(false);
  this.commonService._setLoading(false);
}
}

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 05/08/2019
     * Description: 
    * ***********************************************************************************
     * Modifications
    * ***********************************************************************************
     * Number:
     * Date:
     * Ticket:
     * Author:
     * Description:
  **************************************************************************************/
  callFunction(action){
    switch(action){
      case 'deleteEvidenceArchive':
      this.deleteEvidenceArchive();
      break;

    } 
  }
  
  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 05/08/2019
     * Description: 
    * ***********************************************************************************
     * Modifications
    * ***********************************************************************************
     * Number:
     * Date:
     * Ticket:
     * Author:
     * Description:
  **************************************************************************************/
  closeConfirm(value) {
    this.dialog.close(value);
  }
}

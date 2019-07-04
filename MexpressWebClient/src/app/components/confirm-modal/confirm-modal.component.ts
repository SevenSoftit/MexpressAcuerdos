import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { utiles } from 'src/environments/utiles';

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


onAdd = new EventEmitter();
//#endregion Variables

  constructor(@Inject(MAT_DIALOG_DATA) public dataConfirm: any,
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
    * Creation date: 02/07/2019
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
deleteArchiveNote(){
  this.closeConfirm(); 
  this.onAdd.emit(false);          
}

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
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
   
  setTimeout(() => {
    this.commonService._setLoading(true);
  }, 0, 5000);
if(this.dataConfirm.evidence.pk_Mtr_Pay_Evidence_Process > 0 && this.dataConfirm.evidence.pk_Mtr_Pay_Evidence_Process != undefined)
{
  // this.evidenceModel.Pk_Mtr_Pay_Evidence_Process = this.dataConfirm.evidence.pk_Mtr_Pay_Evidence_Process;
  // this.evidenceModel.Pk_Do_Mtr_Pay_Slip = this.dataConfirm.evidence.pk_Do_Mtr_Pay_Slip;
  // this.evidenceModel.Pk_Do_Cat_Group = this.dataConfirm.evidence.pk_Do_Cat_Group; 
  // this.evidenceModel.Modification_User = utiles.getInfoUser().username;
  // this.evidenceModel.Archive_Original_Name = this.dataConfirm.evidence.archive_Original_Name;
  // this.evidenceModel.Archive_New_Name = this.dataConfirm.evidence.archive_New_Name;
  // this.evidenceModel.Slip_Name = this.dataConfirm.evidence.slip_Name;
  // this.evidenceModel.Active = false;

  // this.evidenceService.deleteEvidence(this.evidenceModel).subscribe(
  //   data => {
  //     this.closeConfirm();     
  //     this.onAdd.emit(true);
  //     this.commonService._setLoading(false);
  //   },
  //   error => {
  //   this.commonService._setLoading(false);
  //   });
}else{
  this.closeConfirm();         
  this.onAdd.emit(false);
  this.commonService._setLoading(false);
}
}



  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
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
 deleteDocumentNote(){
  setTimeout(() => {
    this.commonService._setLoading(true);
  }, 0, 5000);

if(this.dataConfirm.file.pk_Glb_Mtr_Document > 0 && this.dataConfirm.file.pk_Glb_Mtr_Document != undefined)
{
  // this.modelDocument.active = false;
  // this.modelDocument.pk_Glb_Mtr_Document = this.dataConfirm.file.pk_Glb_Mtr_Document;
  // this.modelDocument.master_Identifier =this.dataConfirm.file.master_Identifier;
  // this.modelDocument.modification_User = utiles.getInfoUser().username;
  // this.modelDocument.fk_Glb_Mtr_Company = utiles.getInfoCompany().pk_Glb_Mtr_Company;
  // this.modelDocument.file_Description =this.dataConfirm.file.file_Description ,
  // this.modelDocument.file_Label=this.dataConfirm.file.file_Label,
  // this.modelDocument.file_Name=this.dataConfirm.file.file_Name,
  // this.modelDocument.file_Path=this.dataConfirm.file.file_Path,
  // this.modelDocument.optionsDocument = environment.DeleteDocument;
  // this.documentService.editDocument(this.modelDocument).subscribe(
  //   data => {
  //     this.closeConfirm();     
  //     this.onAdd.emit(true);
  //   },
  //   error => {
  //   this.commonService._setLoading(false);
  //   });
  this.commonService._setLoading(false);
}else{
  this.closeConfirm();         
  this.onAdd.emit(false);
  this.commonService._setLoading(false);
}
}
  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
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
      case 'deleteArchiveNote':
      this.deleteArchiveNote();
      break;
      case 'deleteEvidenceArchive':
      this.deleteEvidenceArchive();
      break;

    } 
  }
  
  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 02/07/2019
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
  closeConfirm() {
    this.dialog.close();
  }
}

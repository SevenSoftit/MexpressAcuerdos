import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { AddAgreementEvidenceModalComponent } from '../add-agreement-evidence-modal/add-agreement-evidence-modal.component';
import { AgreementDocumentModel } from 'src/app/models/agreementDocument.model';
import { CommonService } from '../../services/common/common.service';
import { EvidenceService } from '../../services/evidence/evidence.service';
declare var require: any



@Component({
  selector: 'app-list-evidences-modal',
  templateUrl: './list-evidences-modal.component.html',
  styleUrls: ['./list-evidences-modal.component.scss']
})
export class ListEvidencesModalComponent implements OnInit {
  public evidenceList: any[] = [];
  public evidenceListCount: any = 0;
  public notRepeatEvidence: any;
  public onAdd = new EventEmitter();
  public step = 0;
  public disableButton: boolean = false;



  constructor(@Inject(MAT_DIALOG_DATA) public dataModal: any, private matDialog: MatDialog, private commonService: CommonService, private evidenceService: EvidenceService, private _common: CommonService,public dialog: MatDialog, private activated_route: ActivatedRoute) { 
    this.disableButton = this.dataModal.confirmInfo.status_validation;
  }

  ngOnInit() {
      this.commonService._setLoading(true);

    this.listAllEvidences();
  }

      /*******************************************************
   * Author: Gustavo ZC
   * Creation date:  05/08/2019
   * Description: method that list the groups of evidences
   ****************************************************
   * Modifications
   ****************************************************
   * Number:
   * Date:
   * Ticket:
   * Author:
   * Description:
   *******************************************************/
  listAllEvidences() {
    var evidenceKey = new AgreementDocumentModel();
    evidenceKey.Pk_Ac_Trade_Agreement = this.dataModal.confirmInfo.header_File;
    this.evidenceService.listEvidence(evidenceKey).subscribe(
      dataQ => {
        if(this.dataModal.confirmInfo.is_Invoice == true){
          this.evidenceList = dataQ.filter(x => x.is_Invoice == true);
        }else{
          this.evidenceList = dataQ.filter(x => x.is_Invoice !== true);
        }
      
        this.evidenceListCount = this.evidenceList.length;
        this._common._setLoading(false);
      },
      error => {
        console.log("no se envio" + " " + error);
        this._common._setLoading(false);
      }
    );
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
deleteEvidence(evidence) {
  const dataConfirm = {
    labelTitile: '¿Realmente deseas eliminar este archivo de la evidencia?',
    header: '',
    textDescriptionStart: 'Al eliminar un archivo de una evidencia perderás su información.',
    firstCustomLabel: 'Esta acción no se puede deshacer.',
    textDescriptionMiddle: 'Para continuar eliminando, haz click en el botón',
    secondCustomLabel: 'Eliminar, ',
    textDescriptionEnd: 'para volver, haz click en',
    finalCustomLabel: 'Cancelar.',
    status: false,
    clickFunction: 'deleteEvidenceArchive'
  };

  const dialogRef = this.matDialog.open(ConfirmModalComponent, {
    data: { confirmInfo: dataConfirm, evidence },
    minWidth: '800px', maxWidth: '800px', maxHeight: '300px', minHeight: '300px'
  });
  const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
    if (data) {
      this.listAllEvidences();
    } 

    this.commonService._setLoading(false);
  });

  dialogRef.afterClosed().subscribe(
    () => {
      sub.unsubscribe();
    }
  );
}

      /*******************************************************
   * Author: Gustavo ZC
   * Creation date:  05/08/2019
   * Description: method that download the archive of the note
   ****************************************************
   * Modifications
   ****************************************************
   * Number:
   * Date:
   * Ticket:
   * Author:
   * Description:
   *******************************************************/
  downloadFile(url, archive) {
    try
    {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(url, archive);
    }
    catch
    {
      const dataSuccess = {
        icon: 'warning',
        labelTitile: '¡Atención!',
        textDescription: 'No se puede descargar el archivo',
        // btnClose: 'Cerrar',
        status: 'warning'
      };
  
      const dialogRef = this.matDialog.open(FeedbackModalComponent, {
        data: { contactInfo: dataSuccess },
        minWidth: '500px', maxWidth: '500px', maxHeight: '320px', minHeight: '320px'
      });
     setTimeout(() => dialogRef.close(), 2500);
    }
  }

  /*******************************************************
   * Author: Gustavo ZC
   * Creation date:  05/08/2019
   * Description: method that open the modal to add evidences
   ****************************************************
   * Modifications
   ****************************************************
   * Number:
   * Date:
   * Ticket:
   * Author:
   * Description:
   *******************************************************/
  openAddEvidenceModal(){
    // this.onAdd.emit(true);
    const dialogRef = this.dialog.open(AddAgreementEvidenceModalComponent, {
      data: {confirmInfo: this.dataModal.confirmInfo},
      minWidth: "900px",
      maxWidth: "950px",
      maxHeight: "600px",
      minHeight: "370px"
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.listAllEvidences();
      }
    });
  }

  closeModal(){
    this.onAdd.emit(this.evidenceList); 
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
}

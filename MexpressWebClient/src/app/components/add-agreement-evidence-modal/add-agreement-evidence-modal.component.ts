import { Component, OnInit, EventEmitter, Inject, ViewChild } from '@angular/core';
import { utiles } from 'src/environments/utiles';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-add-agreement-evidence-modal',
  templateUrl: './add-agreement-evidence-modal.component.html',
  styleUrls: ['./add-agreement-evidence-modal.component.scss']
})
export class AddAgreementEvidenceModalComponent implements OnInit {
  //#region Variables
  infoUser = utiles.getInfoUser();
  pkDocument = 0;
  submitted = false;
  public files: Array<any> = [];
  onAdd = new EventEmitter();
  dropzone: any;
  step = 0;
  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  invalidArchive: boolean = false;

  //#endregion Variables


  constructor(private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataModal: any, public matDialogRef: MatDialogRef<AddAgreementEvidenceModalComponent>,
    private commonService: CommonService) { 
      
    }

  ngOnInit() {
  }

  /***********************************************************************************
* Author: Gustavo ZC
* Creation date: 24/07/2019
* Description:
* ***********************************************************************************
* Modifications
* ***********************************************************************************
* Number:
* Date:
* Ticket:
* Author: 
* Description:
* 
**************************************************************************************/
  public config: DropzoneConfigInterface = {
    paramName: 'file',
    clickable: true,
    url: utiles.getInfoUser().apiServiceBaseUri + 'api/evidence/Upload',
    method: 'POST',
    maxFilesize: 100,
    maxFiles: 100,
    dictResponseError: 'Ha ocurrido un error en el servidor',
    acceptedFiles: '.xlsx,.xls,.txt,.pdf,.rar,.zip,.docx, .png, .jpg, .msg, .eml, .tiff, .tif',
    uploadMultiple: true,
    autoProcessQueue: false,
    parallelUploads: 10,
    timeout: 600000,
    dictFileTooBig: "El archivo es muy grande ({{filesize}}) para cargarlo en el sistema. Capacidad máxima {{maxFilesize}}MB",
    dictUploadCanceled: "La carga de archivos ha sido cancelada."
  };

  ngAfterViewInit() {
    this.dropzone = this.componentRef.directiveRef.dropzone();
  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 24/07/2019
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
  saveEvidence() {
    this.commonService._setLoading(true);
    this.submitted = true;
    if (this.files.length <= 0) {
      this.AlmostOneEvidenceModal();
    }


    if (this.files.length > 0) {
      this.dropzone.processQueue();

    }

  }

  /***********************************************************************************
* Author: Gustavo ZC
* Creation date: 24/07/2019
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
  onAddedFile(file) {
    this.invalidArchive = false;
    let data = {
      archive_Original_Name: file.name,
      archive_New_Name: file.name,
      file_Description: ''
    }

    this.files.push(data);

  }

  /***********************************************************************************
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
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
  onSending(file) {
    var selectedFile = this.files.filter(archive => archive.archive_Original_Name === file[0].name)

    if (selectedFile.length <= 0) {

    }
    else {
      file[2].append("Pk_Cat_Document_Agreement", this.pkDocument);
      file[2].append("Pk_Ac_Trade_Agreement", this.dataModal.confirmInfo.header_File);
      file[2].append("Creation_User", utiles.getInfoUser().username);
      file[2].append("Modification_User", utiles.getInfoUser().username);
      file[2].append("Archive_Original_Name", selectedFile[0].archive_Original_Name);
      file[2].append("Archive_New_Name", selectedFile[0].archive_New_Name);
      file[2].append("File_Description", selectedFile[0].file_Description);   
      file[2].append("Name_Agreement", this.dataModal.confirmInfo.name_Agree);
      file[2].append("Active", true);
    }
  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 29/04/2019
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
  public onUploadError(args: any): void {
    var error = '';
    this.invalidArchive = true;

    if(args[1] == "You can't upload files of this type."){
      error = "El archivo "+args[0].name+" contiene una extensión no permitida."
      
    }

    const datafailed = {
      labelTitile: '¡Atención!',
      icon: 'warning',
      textDescription: error != ""?error:args[1],
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: datafailed },
      minWidth: '500px', maxWidth: '500px', maxHeight: '320px', minHeight: '320px'
    });
   setTimeout(() => dialogRef.close(), 3000);

  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 29/04/2019
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
  public onUploadSuccess(): void {
    this.commonService._setLoading(false);
    this.onAdd.emit(true);
    this.modalSuccessEvidence();
    this.closeEvidenceModal();
  }


  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 29/04/2019
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
  onDeleteArchive(File) {

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
      clickFunction: 'removeArchive'
    };
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: { confirmInfo: dataConfirm, File },
      minWidth: '800px', maxWidth: '800px', maxHeight: '300px', minHeight: '300px'
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        const index: number = this.files.indexOf(File);
        if (index !== -1) {
          this.files.splice(index, 1);
        }
      } else {
        this.deleteFileFormData(File);
      }

      this.commonService._setLoading(false);
    });
    dialogRef.afterClosed().subscribe(
      () => {
        sub.unsubscribe();
      }
    );
  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 29/04/2019
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
  deleteFileFormData(File) {
    var fileDeleted = this.dropzone.files.filter(archive => archive.name === File.archive_Original_Name)
    this.dropzone.removeFile(fileDeleted[0]);

    const index: number = this.files.indexOf(File);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  /***********************************************************************************
 * Author: Gustavo ZC
 * Creation date: 29/04/2019
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
  public modalSuccessEvidence() {

    const dataSuccess = {
      icon: 'check_box',
      labelTitile: '¡Listo!',
      textDescription: 'Los datos se guardaron correctamente',
      // btnClose: 'Cerrar',
      status: 'success'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '500px', maxWidth: '500px', maxHeight: '320px', minHeight: '320px'
    });
    setTimeout(() => dialogRef.close(), 3000);
  }


  /***********************************************************************************
* Author: Gustavo ZC
* Creation date: 29/04/2019
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
  public AlmostOneEvidenceModal() {

    const dataSuccess = {
      icon: 'warning',
      labelTitile: '¡Atención!',
      textDescription: 'Debe adjuntarse al menos un archivo a la evidencia',
      // btnClose: 'Cerrar',
      status: 'warning'
    };

    const dialogRef = this.matDialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '500px', maxWidth: '500px', maxHeight: '320px', minHeight: '320px'
    });
    setTimeout(() => dialogRef.close(), 2500);
  }

  /***********************************************************************************
    * Author: Gustavo ZC
    * Creation date: 24/04/2019
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
  closeEvidenceModal() {
    this.matDialogRef.close();
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

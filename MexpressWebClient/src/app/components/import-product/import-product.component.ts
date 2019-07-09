import { Component, OnInit, ɵConsole } from '@angular/core';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { utiles } from 'src/environments/utiles';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackDescriptionModalComponent } from '../feedback-description-modal/feedback-description-modal.component';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CommonService } from 'src/app/services/common/common.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.scss']
})
export class ImportProductComponent implements OnInit {

  constructor(public dialog: MatDialog,public matDialogRef: MatDialogRef<ImportProductComponent>, private _common: CommonService) { }
  public uploadObj: UploaderComponent;
  infoUser = utiles.getInfoUser();
  public userName: string = this.infoUser.username;
  public PK_GLB_MTR_ORGANIZATION: string = '1';

  public config: DropzoneConfigInterface = {
    paramName: 'file',
    clickable: true,
    // url: "http://localhost:50077/api/GblWrkEmployee/ImportFile?User=" + this.userName + "&FK_GLB_MTR_ORGANIZATION=" + this.PK_GLB_MTR_ORGANIZATION,
    
    url: utiles.getInfoUser().apiServiceBaseUri + "api/GblWrkAgreementDetail/ImportFile?User=" + this.userName + "&FK_GLB_MTR_ORGANIZATION=" + this.PK_GLB_MTR_ORGANIZATION,
    method: 'POST',
    maxFilesize: 10,
    maxFiles: 10,
    dictResponseError: 'Ha ocurrido un error en el servidor',
    acceptedFiles: '.xlsx,.xls',
    uploadMultiple: true,
    autoProcessQueue: true,
    //parallelUploads: 10
  };

  ngOnInit() {
  }


  public onUploadError(args: any): void {
    const datafailed = {
      labelTitile: 'Error',
      icon: 'info',
      textDescription: 'Existen problemas al procesar el archivo, revisar la plantilla y volver a intentarlo',
      status:'error'
    };

    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      data: { contactInfo: datafailed },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
   setTimeout(() => dialogRef.close(), 3000);

    this._common._setLoading(false);
  }

  public onUploadSuccess(args: any): void {
    const dataSuccess = {
      labelTitile: '¡Listo!',
      icon: 'check_box',
      textDescription: 'Archivo guardado exitosamente.',
      status: 'success'
    };

    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      data: { contactInfo: dataSuccess },
      minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
    });
    setTimeout(() => dialogRef.close(), 3000);
    this.closeDocumentModal(args[1]);
    this._common._setLoading(false);
  }

  onSending(file) {
    setTimeout(() => {
      this._common._setLoading(true);
    }, 0, 5000);
    debugger;
    file[2].append("UserName", this.userName );
    file[2].append("FK_GLB_MTR_ORGANIZATION", this.PK_GLB_MTR_ORGANIZATION );
}


closeDocumentModal(list){
  this.matDialogRef.close(list);
}


}

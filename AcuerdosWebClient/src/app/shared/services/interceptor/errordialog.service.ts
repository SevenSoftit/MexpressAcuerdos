import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { utiles } from 'src/environments/utiles';
import { Router } from '@angular/router';
import { FeedbackModalComponent } from '../../modal/feedback-modal/feedback-modal.component';

@Injectable()
export class ErrorDialogService {

    constructor(public matDialog: MatDialog, private router: Router) { }
    openDialog(data): void {
        const datafailed = {
            labelTitile: 'Error',
            icon: 'info',
            textDescription:(data.error == null) ? '' : (data.error.error_description) ? data.error.error_description : data.error,
            status: 'error'
          };
          if (data.status == 0) {
            datafailed.textDescription = "Se ha perdido la conexión con el servidor.";
            utiles.clearCache();
            this.router.navigate(['login']);
          }
          else if (data.status == 401) {
            datafailed.textDescription = "El periodo de inactividad se ha cumplido, por favor ingresar nuevamente.";
            utiles.clearCache();
            this.router.navigate(['login']);
          }

          else if (data.error == 'error_PDF') {
            datafailed.textDescription = "Debe cerrar el PDF anterior para guardar el siguiente";
          }

          const dialogRef = this.matDialog.open(FeedbackModalComponent, {data: {contactInfo: datafailed},
            minWidth: '478px', maxWidth: '478px', maxHeight: '277px', minHeight: '277px'});
            setTimeout(() => dialogRef.close(), 3000);
    }
}
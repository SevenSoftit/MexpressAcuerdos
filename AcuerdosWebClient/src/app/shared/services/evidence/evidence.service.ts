import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { AgreementDocumentModel } from 'src/app/models/agreementDocument.model';
import { utiles } from 'src/environments/utiles';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  //#region variables
    apiUrl :any;
  //#endregion variables

  //#region constructor
    constructor(public http: HttpClient, private router: Router) { 
      const data = utiles.getInfoUser();
      if (data !== null && data){
        this.apiUrl = utiles.getInfoUser().apiServiceBaseUri
      }else {
        this.router.navigate(['login']);
      }  }
  //#endregion constructor

  //#region Methods

 /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
  --------------------------------------------------------------------*/
  saveEvidence (contactInfoData: AgreementDocumentModel) {
    const url = this.apiUrl + 'api/evidence/save';
    return this.http.post<AgreementDocumentModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: AgreementDocumentModel) => console.log('')),
      catchError(this.handleError<AgreementDocumentModel>(''))
      );
  }

  /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
  --------------------------------------------------------------------*/
  listEvidence (contactInfoData: any) {
    const url = this.apiUrl + 'api/evidence/List';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
      );
  }

    /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
  --------------------------------------------------------------------*/
  deleteEvidence (contactInfoData: AgreementDocumentModel) {
    const url = this.apiUrl + 'api/evidence/delete';
    return this.http.post<AgreementDocumentModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: AgreementDocumentModel) => console.log('')),
      catchError(this.handleError<AgreementDocumentModel>(''))
      );
  }

      /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
  --------------------------------------------------------------------*/
  deleteEvidenceRoute (contactInfoData: AgreementDocumentModel) {
    const url = this.apiUrl + 'api/evidence/DeletePathArchive';
    return this.http.post<AgreementDocumentModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: AgreementDocumentModel) => console.log('')),
      catchError(this.handleError<AgreementDocumentModel>(''))
      );
  }


  /*******************************************************
  * Author: Gustavo ZC
  * Creation date: 24/07/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
*******************************************************/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable <T> => {
    console.error(error);

    return of (result as T);
    };
  }
  //#endregion Methods

}




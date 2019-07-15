import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {utiles} from '../../../environments/utiles';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TypeOfAgreementModel } from 'src/app/models/typeOfAgreement.model';


const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class TypeOfAgreementService {

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
  * Creation date: 15/07/2019
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
  saveTypeOfAgreement (contactInfoData: TypeOfAgreementModel) {
    const url = this.apiUrl + 'api/typeOfAgreement/Save';
    return this.http.post<TypeOfAgreementModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: TypeOfAgreementModel) => console.log('')),
      catchError(this.handleError<TypeOfAgreementModel>(''))
      );
  }

  /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 15/07/2019
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
  listTypeOfAgreement (contactInfoData: any) {
    const url = this.apiUrl + 'api/typeOfAgreement/List';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
      );
  }

    /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 15/07/2019
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
  deleteMoney (contactInfoData: TypeOfAgreementModel) {
    const url = this.apiUrl + 'api/typeOfAgreement/Delete';
    return this.http.post<TypeOfAgreementModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: TypeOfAgreementModel) => console.log('')),
      catchError(this.handleError<TypeOfAgreementModel>(''))
      );
  }

  /*******************************************************
  * Author: Gustavo ZC
  * Creation date: 15/07/2019
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




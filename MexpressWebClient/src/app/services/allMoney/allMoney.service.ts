import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {utiles} from '../../../environments/utiles';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MoneyModel } from 'src/app/models/money.model';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class AllMoneyService {

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
  * Creation date: 09/07/2019
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
  saveMoney (contactInfoData: MoneyModel) {
    const url = this.apiUrl + 'api/evidence/save';
    return this.http.post<MoneyModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: MoneyModel) => console.log('')),
      catchError(this.handleError<MoneyModel>(''))
      );
  }

  /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 09/07/2019
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
  listMoney (contactInfoData: any) {
    const url = this.apiUrl + 'api/money/List';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
      );
  }

    /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 09/07/2019
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
  deleteMoney (contactInfoData: MoneyModel) {
    const url = this.apiUrl + 'api/evidence/delete';
    return this.http.post<MoneyModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: MoneyModel) => console.log('')),
      catchError(this.handleError<MoneyModel>(''))
      );
  }

  /*******************************************************
  * Author: Gustavo ZC
  * Creation date: 09/07/2019
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




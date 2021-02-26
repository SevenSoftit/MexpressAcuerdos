
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from 'src/environments/utiles';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class TradeAgreementDetailService {
  //#region variables
  apiUrl: any;
  //#endregion variables
  constructor(public http: HttpClient, private router: Router) {
    const data = utiles.getInfoUser();
    if (data !== null && data) {
      this.apiUrl = utiles.getInfoUser().apiServiceBaseUri
    } else {
      this.router.navigate(['login']);
    }
  }

  /*------------------------------------------------------------------
* Author: Gustavo ZC
* Creation date: 10/02/2021
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
  listFacturationInfo(model: any) {
    const url = this.apiUrl + + 'api/AgreementFacturation/List';
    return this.http.post<any>(url, model, httpOptions)
      .pipe(map(response => {
        return response
      }))
  }
  /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 10/07/2019
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
  ListTradeAgreementDetail(tradeAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetail/ListAgreementDetail';
    return this.http.post<any[]>(url, tradeAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  updateInventory(tradeAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetail/ListInventory';
    return this.http.post<any[]>(url, tradeAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  processWorkProductDetailTable(employeeData: any) {
    const url = this.apiUrl + 'api/agreementDetail/ProcessWorkProductDetailTable';
    return this.http.post<any[]>(url, employeeData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  /*------------------------------------------------------------------
* Author: Gustavo ZC
* Creation date: 10/07/2019
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
  saveTradeAgreementDetail(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetail/Save';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  deleteTradeAgreementDetailProduct(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetail/Delete';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  validateTradeAgreementDetailProductError(employeeData: any) {
    const url = this.apiUrl + 'api/agreementDetail/ValidateProductError';
    return this.http.post<any>(url, employeeData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  /*------------------------------------------------------------------
* Author: Gustavo ZC
* Creation date: 12/08/2019
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
  listAgreementDetailsResume(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementProductInfo/List';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
    );
  }

  calculateAmounts(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementProductInfo/CalculateAmounts';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
    );
  }

  /*------------------------------------------------------------------
* Author: Gustavo ZC
* Creation date: 12/08/2019
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
  viewAgreementProductDetails(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementProductInfoDetail/List';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap((product: any) => console.log('')),
      catchError(this.handleError<any>(''))
    );
  }

  listNameAgree(nameAgreement: any) {
    const url = this.apiUrl + 'api/agreementName/List';
    return this.http.post<any[]>(url, nameAgreement, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  listAgreementDate(dateAgreement: any) {
    const url = this.apiUrl + 'api/agreementDate/List';
    return this.http.post<any[]>(url, dateAgreement, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  // HEADER OF THE AGREEMENT
  saveAgreementHeader(contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetailHeader/Save';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  copyAgreement(contactInfoData: any) {
    const url = this.apiUrl + 'api/AgreementDetailHeader/SaveCopy';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }


  ListHeaderAgreementDetail(headerAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetailHeader/ListHeaderAgreement';
    return this.http.post<any[]>(url, headerAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  ListHeaderAgreementDetailStatus(headerAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetailHeader/Get';
    return this.http.post<any[]>(url, headerAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  ListAgreementStatus(headerAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementStatus/List';
    return this.http.post<any[]>(url, headerAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  ListAgreementGoals(agreement: any) {
    const url = this.apiUrl + 'api/agreementGoals/List';
    return this.http.post<any>(url, agreement, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  saveAgreementGoals(agreement: any) {
    const url = this.apiUrl + 'api/agreementGoals/Save';
    return this.http.post<any>(url, agreement, httpOptions).pipe(
      tap(() => console.log(''))
    );
  }

  /*******************************************************
* Author: Gustavo ZC
* Creation date: 12/08/2019
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
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }


}

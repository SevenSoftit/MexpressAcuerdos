
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from 'src/environments/utiles';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class TradeAgreementDetailService {
 //#region variables
 apiUrl : any;
 //#endregion variables
  constructor(public http: HttpClient, private router: Router) { 
    const data = utiles.getInfoUser();
    if (data !== null && data){
      this.apiUrl = utiles.getInfoUser().apiServiceBaseUri
    }else {
      this.router.navigate(['login']);
    }  }


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
  ListTradeAgreementDetail (tradeAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetail/ListAgreementDetail';
    return this.http.post<any[]>(url, tradeAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }

  processWorkProductDetailTable (employeeData: any) {
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
  saveTradeAgreementDetail (contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetail/Save';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }

  deleteTradeAgreementDetailProduct (contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetail/Delete';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }

  validateTradeAgreementDetailProductError (employeeData: any) {
    const url = this.apiUrl + 'api/agreementDetail/ValidateProductError';
    return this.http.post<any>(url, employeeData, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }
  
  // HEADER OF THE AGREEMENT

  saveAgreementHeader (contactInfoData: any) {
    const url = this.apiUrl + 'api/agreementDetailHeader/Save';
    return this.http.post<any>(url, contactInfoData, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }

  ListHeaderAgreementDetail (headerAgreementDetail: any) {
    const url = this.apiUrl + 'api/agreementDetailHeader/ListHeaderAgreement';
    return this.http.post<any[]>(url, headerAgreementDetail, httpOptions).pipe(
      tap(() => console.log(''))
      );
  }

}

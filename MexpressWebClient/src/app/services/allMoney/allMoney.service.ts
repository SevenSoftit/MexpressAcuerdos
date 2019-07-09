import { MoneyModel } from './../../models/money.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from 'src/environments/utiles';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class AllMoneyService {
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
  * Creation date: 07/03/2019
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
  ListAllGroup (allGroup: NewGroupModel) {
    const url = this.apiUrl + 'api/group/ListGroup';
    return this.http.post<NewGroupModel[]>(url, allGroup, httpOptions).pipe(
      tap((product: NewGroupModel[]) => console.log(''))
      );
  }

    /*------------------------------------------------------------------
  * Author: Gustavo ZC
  * Creation date: 26/03/2019
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
  ListAllGroupArray (allGroup: NewGroupModel) {
    const url = this.apiUrl + 'api/group/ListGroup';
    return this.http.post<any>(url, allGroup, httpOptions).pipe(
      tap((product: any) => console.log(''))
      );
  }

 
}

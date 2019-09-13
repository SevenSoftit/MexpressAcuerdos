import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from 'src/environments/utiles';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { OrganizationModel } from 'src/app/models/organization.model';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
 //#region variables
 apiUrl :any;
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
  * Creation date: 18/03/2019
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
  saveOrganization (contactInfoData: OrganizationModel) {
    const url = this.apiUrl + 'api/organization/save';
    return this.http.post<OrganizationModel>(url, contactInfoData, httpOptions).pipe(
      tap((product: OrganizationModel) => console.log(''))
      );
  }


}

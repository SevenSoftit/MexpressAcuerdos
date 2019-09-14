import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from 'src/environments/utiles';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { HomeModel } from 'src/app/models/home.Model';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class DashboardResumeService {
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
  * Creation date: 09/05/2019
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
  ListAgreementsDashboardResume (resume: HomeModel) {
    const url = this.apiUrl + 'api/dashboardresume/ListDashboardResume';
    return this.http.post<HomeModel[]>(url, resume, httpOptions).pipe(
      tap((product: HomeModel[]) => console.log(''))
      );
  } 
}

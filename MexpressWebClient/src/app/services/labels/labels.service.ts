import { Injectable } from '@angular/core';
import { LabelModel } from '../../models/label.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { utiles } from '../../../environments/utiles';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { LoginModel } from '../../components/login/login.Model'
import { Router } from '@angular/router';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  public loginData: LoginModel;
  apiUrl : any;
  constructor(public http: HttpClient, public dialog: MatDialog, private router: Router) { 
    const data = utiles.getInfoUser();
    if (data !== null && data){
      this.apiUrl = utiles.getInfoUser().apiServiceBaseUri
    }else {
      this.router.navigate(['login']);
    }  }

/*------------------------------------------------------------------
    * Author: Gustavo ZC
    * Creation date: 20/03/2019
    * Description: method to obtain the labels of the forms
   * *****************************************************
    * Modifications
   * *****************************************************
    * Number:
    * Date:
    * Ticket:
    * Author:
    * Description:
    --------------------------------------------------------------------*/

  getLabels(labelModel: LabelModel) {
    this.loginData = utiles.getInfoUser();
    labelModel.Creation_User = this.loginData.userName;
    labelModel.Modification_User = this.loginData.userName;
    labelModel.Creation_Date = new Date();
    labelModel.Modification_Date = new Date();
    const url = this.apiUrl + 'api/GblCatLabel/List';
    return this.http.post<LabelModel[]>(url, labelModel, httpOptions).pipe(
      tap((list: LabelModel[]) => console.log())
    );
  }
  
  }
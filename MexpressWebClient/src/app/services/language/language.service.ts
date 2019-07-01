import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageModel } from '../../models/language.model';
import { catchError, tap, map } from 'rxjs/operators';
import { utiles } from '../../../environments/utiles';
import { Observable, of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../auth/auth.service';
import { LoginModel } from '../../components/login/login.Model'
import { FeedbackDescriptionModalComponent } from 'src/app/components/feedback-description-modal/feedback-description-modal.component';
import { Router } from '@angular/router';
/*Constants */
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
// const methodApi = "/token"
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  variabledata: any;
  public loginData: LoginModel;
  apiUrl: any;
  constructor(public http: HttpClient, public dialog: MatDialog, private router: Router) { 
    const data = utiles.getInfoUser();
    if (data !== null && data){
      this.apiUrl = utiles.getInfoUser().apiServiceBaseUri
    }else {
      this.router.navigate(['login']);
    } }


  /*------------------------------------------------------------------
    * Author: Gustavo ZC
    * Creation date: 20/03/2019
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
    getLanguage(languageData: LanguageModel) {
      this.loginData = utiles.getInfoUser();
   
      languageData.Modification_User = this.loginData.userName;
      languageData.Creation_User = this.loginData.userName;
  
      languageData.Modification_Date = new Date();
      languageData.Creation_Date = new Date();
  
      const url = this.apiUrl + 'api/GblLanguage/List';
      return this.http.post<LanguageModel[]>(url, languageData, httpOptions).pipe(
        tap((list: LanguageModel[]) => console.log('')),
        catchError(this.handleError<LanguageModel[]>(''))
      );
    }


  /*******************************************************
 * Author: Gustavo ZC
 * Creation date: 20/03/2019
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
    let errorMessage = '';
    return (error: any): Observable<T> => {
      this.variabledata = error;
     // AuthService.accsesRoute(false);
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      // tslint:disable-next-line:no-debugger
      debugger;
      this.openDialog();
      return throwError(errorMessage);
    };
  }

    /***********************************************************************************
  * Author: Gustavo ZC
  * Creation date: 21/03/2019
  * Description:
 * ***********************************************************************************
  * Modifications
 * ***********************************************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:
**************************************************************************************/
public openDialog() {

  const dataSuccess = {
    icon: 'info',
    labelTitile: 'Información',
    textDescription: this.variabledata.message,
    status: 'error'
  };

  const dialogRef = this.dialog.open(FeedbackDescriptionModalComponent, {
    data: { contactInfo: dataSuccess },
    minWidth: '27vw', maxWidth: '35vw', maxHeight: '35vh', minHeight: '23vh'
  });
  setTimeout(() => dialogRef.close(), 3000);
}
}

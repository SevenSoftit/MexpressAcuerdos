import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginModel } from 'src/app/components/login/login.Model';
import { environment } from 'src/environments/environment';


/*Constants */
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
const methodApi = "/token"

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  //#region contructor
  constructor(public http: HttpClient) { }
  //#endregion contructor

//#region Methods

/*******************************************************
  * Author: Erick Sibaja
  * Creation date: 01/02/2019
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
  login(loginData:LoginModel) {
    var data = "grant_type=password&username=" + loginData.Username + "&password=" + loginData.Password + "&client_id=" + environment.clientId;

    const url = environment.apiURL + methodApi
    return this.http.post<LoginModel>(url,data,httpOptions).pipe(
      tap((product:LoginModel) => console.log(''))
    );
  };

/*******************************************************
  * Author: Erick Sibaja
  * Creation date: 04/02/2019
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
loginLocalApi(loginData:LoginModel) {

  //var data = "grant_type=password&username=" + loginData.Usuario_Autenticacion + "&password=" + loginData.Password_Autenticacion + "&client_id=" + environment.clientId;

  const url = loginData.apiServiceBaseUri +"api/token/"+ loginData.Metodo_Autenticacion;
  return this.http.post<LoginModel>(url,loginData,httpOptions).pipe(
    tap((product:LoginModel) => console.log(''))
  );
};


//#endregion Methods

}

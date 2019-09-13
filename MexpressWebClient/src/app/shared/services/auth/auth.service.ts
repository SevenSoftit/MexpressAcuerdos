import { Injectable } from '@angular/core';

@Injectable()
/*******************************************************
  * Author: Esalas
  * Creation date: 27/05/2019
  * Description:
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author: 
  * Description:set the value of the login and send to guard
*******************************************************/
export class AuthService {
    public static logueado: boolean = false

    // static accsesRoute(login: boolean) {
    //     this.logueado = login;
    // }
    // static login() {
    //     if (this.logueado) {
    //         return true;
    //     } else {
    //         return false;
    //     }
 
    // }

    private loggedInStatus = false; 

    setLoggedIn(value){
        this.loggedInStatus = value;
    }

    get isLoggedIn(){
        return this.loggedInStatus;
    }

}
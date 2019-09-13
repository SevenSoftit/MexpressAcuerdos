import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/*******************************************************
  * Author: Gustavo ZC
  * Creation date: 21/03/2019
  * Description:receives the value of the login method
 * *****************************************************
  * Modifications
 * *****************************************************
  * Number:
  * Date:
  * Ticket:
  * Author:
  * Description:
*******************************************************/
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.authService.isLoggedIn){
        return this.authService.isLoggedIn;
      } else {
        this.router.navigate(["login"]);
      }

    }
}
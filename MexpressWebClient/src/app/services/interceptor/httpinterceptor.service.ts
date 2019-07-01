import { Injectable } from '@angular/core';
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { utiles } from 'src/environments/utiles';
import { ErrorDialogService } from 'src/app/services/interceptor/errordialog.service';
import { debug } from 'util';

@Injectable()
export class HttpinterceptorService implements HttpInterceptor {

  constructor(public errorDialogService: ErrorDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string = "";

    var infoAuthorization = utiles.getInfoAuthorization();
    if(infoAuthorization != undefined)
      token = infoAuthorization.token;
  
    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });
    // }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // console.log('event--->>>', event);
            }
            return event;
        }),       
        
        catchError((error: HttpErrorResponse) => {
            this.errorDialogService.openDialog(error);
            return throwError(error);
        }));


  }

}

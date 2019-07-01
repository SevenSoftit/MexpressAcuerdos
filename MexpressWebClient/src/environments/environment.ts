import { Headers } from "@angular/http";

let headers = new Headers({ 'Content-Type': 'application/json' });
//let options = new RequestOptions({ headers: headers });

export const environment = {
    /************** INFO SISTEMA *******************/

    apiURL: 'http://192.168.20.114/SevenSoft.Security.BackEnd.Web.Api.MExp/', //Desarrollo: http://74.208.217.164/SevenSoft.Security.BackEnd.Web.Api/
    production: false,                                                   // Producción: http://192.168.20.114/SevenSoft.Security.BackEnd.Web.Api.MExp/ 
    //options: options,
    clientId: 'MEXPRESS_DO',
  
    /************** INFO SISTEMA *******************/


      /***************FORGOT PASSWORD*****************/
  ForgotPassword:"13",
  ChangeCurrentPassword:"15"
  /***************FORGOT PASSWORD*****************/


};


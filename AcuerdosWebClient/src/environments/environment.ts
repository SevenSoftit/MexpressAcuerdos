import { Headers } from "@angular/http";

let headers = new Headers({ 'Content-Type': 'application/json' });
//let options = new RequestOptions({ headers: headers });

export const environment = {
    /************** INFO SISTEMA *******************/

    apiURL: 'http://74.208.217.164/SevenSoft.Security.BackEnd.Web.Api/', //Desarrollo: http://74.208.217.164/SevenSoft.Security.BackEnd.Web.Api/
    production: false,                                                   // Producción: http://192.168.20.114/SevenSoft.Security.BackEnd.Web.Api.MExp/
                                                                         // Producción Desarrollo: http://74.208.253.79/SevenSoft.Security.BackEnd.Web.Api/  
    //options: options,
    clientId: 'MEXPRESS_AC', 
  
    /************** INFO SISTEMA *******************/


      /***************FORGOT PASSWORD*****************/
  ForgotPassword:"13",
  ChangeCurrentPassword:"15"
  /***************FORGOT PASSWORD*****************/


};


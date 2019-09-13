import { Http, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { CustomRequestOptions } from './CustomRequestOptions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpProvider extends Http {

  constructor(connectionBackend: ConnectionBackend, requestOptions: RequestOptions) {
    super(connectionBackend, requestOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, this.getRequestOptionArgs(options))
  };

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    debugger;
    return super.post(url, body, this.getRequestOptionArgs(options))
  };

  getRequestOptionArgs(options?: RequestOptionsArgs) {
    if (options == null || options == undefined) {
      options = new CustomRequestOptions();
    }
    else {
      var optionsAux = new CustomRequestOptions();
      options.headers = optionsAux.headers;
    }

    return options;
  }
}

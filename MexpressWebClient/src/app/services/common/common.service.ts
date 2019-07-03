import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatalogModel } from '../../components/common-model/catalog.Model';
import {utiles} from '../../../environments/utiles';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
const methodApi = "api/User/Save";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private data = new BehaviorSubject('');
  menuOptions = this.data.asObservable();

  private loading = new BehaviorSubject(false);
  loadingService = this.loading.asObservable();

  private moduleData = new BehaviorSubject('');
  moduleName = this.moduleData.asObservable();

  constructor(public http: HttpClient) { }

  asignMenu(item: any) {
    this.data.next(item);
  }

  _setLoading(item: any) {
    this.loading.next(item);
  }
  asignHeaderTitle(item: any) {
    this.moduleData.next(item);
  }

  listCatalog(catalogModel: CatalogModel) {
    const url = utiles.getInfoUser().apiServiceBaseUri + 'api/catalog/list';
    return this.http.post<CatalogModel>(url, catalogModel, httpOptions).pipe(
      tap((product: CatalogModel) => console.log(''))
      );
  }

    /*------------------------------------------------------------------
  Nombre: _forgotPassword
  Descripción: send a request for changing password
  Fecha de creación: 15/05/2019
  Autor: Gustavo ZC
  --------------------------------------------------------------------*/
  _OptionsUser(model: any) {

    const url = environment.apiURL + methodApi

    return this.http.post<any>(url, model, httpOptions).pipe(
      tap((product: any) => console.log(''))
    );
    // return this.http.post<LoginModel>(environment.apiURL + methodApi, data, environment.options).map((res: Response) => res.json());
  };

}
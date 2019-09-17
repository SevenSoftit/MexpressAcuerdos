import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  //#region variables
  loading = false;

  // #subregion variables interfaz
  //#region variables


  //#region constructor
  /*********************************************************************
   * Author: ESibaja
   * Creation date: 01/02/2019
   *********************************************************************/
  constructor(
    private _common: CommonService
  ) { }
  //#endregion constructor

  ngOnInit() {
    /*********************************************************************************
       * Number: 0005
       * Author: Andres Sibaja
       * Date: 29/03/2019
       * Description: Declare and initialize the variable for loading
       * ********************************************************************************/
    this._common._setLoading(false);
    this._common.loadingService
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.loading = data;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

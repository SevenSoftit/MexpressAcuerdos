import { Component, OnInit } from '@angular/core';
import { utiles } from 'src/environments/utiles';
import { Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public sccsLeft: string;
  public sccsContent: string;
  loading = true;
  hasAuth : any;
  constructor(private _common: CommonService, private router: Router) { }

  ngOnInit() {
    if (utiles.getInfoUser()!== null && utiles.getInfoUser()!== undefined){
      this.hasAuth = utiles.getInfoUser().Posee_Autenticacion;
      this._common._setLoading(false);
    }
    if(this.hasAuth === 'True'){
    setTimeout(() => { 
      this._common.loadingService.subscribe(data => { 
        this.loading = data;
      });
    }, 0, 5000);
  }else {
    this.router.navigate(['login']);
   }
  }

  onCollapseMenu(data: boolean) {
    if(data){
      this.sccsLeft = 'content-with-left-open';
      this.sccsContent = 'content-with-content-open';
    }
    else{
      this.sccsLeft = 'content-with-left-close';
      this.sccsContent = 'content-with-content-close';
    }
    //alert('onCollapseMenu');
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeAgreementsComponent } from './trade-agreements.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EditService,PageService,FilterService,SortService,ResizeService,GridModule} from "@syncfusion/ej2-angular-grids";
import { MaterialModule } from 'src/app/material-module';
import { setCulture, L10n } from '@syncfusion/ej2-base';


setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
          'EmptyRecord': 'Sin coincidencias'
      }
  }
});

const routes: Routes = [
  { path: '', component: TradeAgreementsComponent },

];
@NgModule({
  declarations: [TradeAgreementsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ScrollDispatchModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule 
  ],
  providers: [
    EditService,
    PageService,
    FilterService,
    SortService,
    ResizeService,
    
  ]
})
export class TradeAgreementsModule { }

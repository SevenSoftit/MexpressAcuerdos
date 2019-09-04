import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EditService,PageService,FilterService,SortService,ResizeService,GridModule} from "@syncfusion/ej2-angular-grids";
import { MaterialModule } from 'src/app/material-module';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { AgreementConciliationComponent } from './agreement-conciliation.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';


setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
          'EmptyRecord': 'Sin coincidencias',
          'Search': 'Buscar'
      }
  }
});  

const routes: Routes = [
  { path: '', component: AgreementConciliationComponent },

];
@NgModule({
  declarations: [AgreementConciliationComponent],
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
    MaterialModule,
    ButtonModule,
    DropDownListAllModule
  ],
  providers: [
    EditService,
    PageService,
    FilterService,
    SortService,
    ResizeService,
    
  ],
  bootstrap: [AgreementConciliationComponent]
})

export class AgreementConciliationModule { }

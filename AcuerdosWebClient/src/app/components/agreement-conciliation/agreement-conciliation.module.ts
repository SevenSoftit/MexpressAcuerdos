import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EditService,PageService,FilterService,SortService,ResizeService,GridModule, ExcelExportService, ToolbarService} from "@syncfusion/ej2-angular-grids";
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { AgreementConciliationComponent } from './agreement-conciliation.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
          'EmptyRecord': 'Sin coincidencias',
          'Search': 'Buscar',
          'ExcelExport': 'Exportar a Excel'
      }
  }
});  

const routes: Routes = [
  { path: '', component: AgreementConciliationComponent },

];
@NgModule({
  declarations: [AgreementConciliationComponent],
  exports: [
    AgreementConciliationComponent
  ],
  entryComponents: [AgreementConciliationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonModule,
    DropDownListModule
  ],
  providers: [
    EditService,
    PageService,
    FilterService,
    SortService,
    ResizeService,
    ToolbarService,
    ExcelExportService
    
  ],
})

export class AgreementConciliationModule { }

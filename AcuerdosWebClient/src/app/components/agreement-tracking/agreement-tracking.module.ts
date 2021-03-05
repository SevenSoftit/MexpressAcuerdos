import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditService,PageService,FilterService,SortService,ResizeService,ExcelExportService, ToolbarService} from "@syncfusion/ej2-angular-grids";
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { AgreementTrackingComponent } from './agreement-tracking.component';
import { SharedModule } from 'src/app/shared-module';

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
  { path: '', component: AgreementTrackingComponent },

];
@NgModule({
  declarations: [AgreementTrackingComponent],
  exports: [
    AgreementTrackingComponent
  ],
  entryComponents: [AgreementTrackingComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
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
  bootstrap: [AgreementTrackingComponent]
})

export class AgreementTrackingModule { }

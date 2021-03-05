import { NgModule } from '@angular/core';
import { TradeAgreementsComponent } from './trade-agreements.component';
import { Routes, RouterModule } from '@angular/router';
import {EditService,PageService,FilterService,SortService,ResizeService,SearchService, ToolbarService, ForeignKeyService, ExcelExportService} from "@syncfusion/ej2-angular-grids";
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { SharedModule } from 'src/app/shared-module';

setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
          'Add': 'Agregar',
          'ExcelExport': 'Exportar a Excel',
          'Edit': 'Editar',
          'Delete': 'Eliminar',
          'Update': 'Actualizar',
          'Cancel': 'Cancelar',
          'Search': 'Buscar',
          'EmptyRecord': 'Sin coincidencias',
          'PdfExport': 'Exportar a PDF'
      }
  }
});
const routes: Routes = [
  { path: '', component: TradeAgreementsComponent },

];
@NgModule({
  declarations: [TradeAgreementsComponent],
  exports: [
    TradeAgreementsComponent,
  ],
  entryComponents: [TradeAgreementsComponent],
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
    SearchService,
    ToolbarService,
    ForeignKeyService,
    ExcelExportService

  ]
})
export class TradeAgreementsModule { }

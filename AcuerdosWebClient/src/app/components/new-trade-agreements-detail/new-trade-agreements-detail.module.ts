import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NewTradeAgreementsDetailComponent } from './new-trade-agreements-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ToolbarService, EditService, PageService, FilterService, SortService, FreezeService, ResizeService, ExcelExportService, PdfExportService } from "@syncfusion/ej2-angular-grids";
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
// Infinite scroll
import { SharedModule } from 'src/app/shared-module';



setCulture('es-LATAM');

L10n.load({
  'es-LATAM': {
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
  { path: '', component: NewTradeAgreementsDetailComponent },

];
@NgModule({
  declarations: [NewTradeAgreementsDetailComponent],
  exports: [
    NewTradeAgreementsDetailComponent,
  ],
  entryComponents: [NewTradeAgreementsDetailComponent],
  imports: [
    NgxMaskModule.forRoot(options), 
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    ToolbarService,
    EditService,
    PageService,
    FilterService,
    SortService,
    FreezeService,
    ResizeService,
    ExcelExportService,
    PdfExportService,
    DatePipe
  ]
})
export class NewTradeAgreementsDetailModule { }

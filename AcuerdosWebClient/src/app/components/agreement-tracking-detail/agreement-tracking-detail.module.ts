import { NgModule } from '@angular/core';
import { AgreementTrackingDetailComponent } from './agreement-tracking-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ToolbarService, EditService, PageService, FilterService, SortService, FreezeService, ResizeService, ExcelExportService, PdfExportService } from "@syncfusion/ej2-angular-grids";
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
// Infinite scroll
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
  { path: '', component: AgreementTrackingDetailComponent },

];

@NgModule({
  declarations: [AgreementTrackingDetailComponent],
  exports: [
    AgreementTrackingDetailComponent
  ],
  entryComponents: [AgreementTrackingDetailComponent],
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
    PdfExportService
  ]
})
export class AgreementTrackingDetailModule { }

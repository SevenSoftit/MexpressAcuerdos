import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementReportComponent } from './agreement-report.component';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { Routes, RouterModule } from '@angular/router';
import { GridModule, ToolbarService, EditService, PageService, FilterService, SortService, FreezeService, ResizeService } from '@syncfusion/ej2-angular-grids';

setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
          'Add': 'Agregar',
          'Edit': 'Editar',
          'Delete': 'Eliminar',
          'Update': 'Actualizar',
          'Cancel': 'Cancelar',
          'Search': 'Buscar',
          'EmptyRecord': 'Sin coincidencias'
      }
  }
});

const routes: Routes = [
  { path: '', component: AgreementReportComponent },

];

@NgModule({
  declarations: [AgreementReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule
  ],
  providers: [
    ToolbarService,
    EditService,
    PageService,
    FilterService,
    SortService,
    FreezeService,
    ResizeService
  ]
})
export class AgreementReportModule { }

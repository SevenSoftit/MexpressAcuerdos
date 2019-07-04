import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTradeAgreementsComponent } from './new-trade-agreements.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
// import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarService,EditService,PageService,FilterService,SortService,FreezeService,ResizeService,GridModule, ExcelExportService, PdfExportService} from "@syncfusion/ej2-angular-grids";
import { MatSelectModule } from '@angular/material/select';
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('es-ES');

L10n.load({
  'es-ES': {
      'grid': {
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
  { path: '', component: NewTradeAgreementsComponent },

];
@NgModule({
  declarations: [NewTradeAgreementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
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
export class NewTradeAgreementsModule { }

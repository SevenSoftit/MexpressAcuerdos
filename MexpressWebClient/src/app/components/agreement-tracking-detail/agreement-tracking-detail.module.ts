import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementTrackingDetailComponent } from './agreement-tracking-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarService,EditService,PageService,FilterService,SortService,FreezeService,ResizeService,GridModule, ExcelExportService, PdfExportService} from "@syncfusion/ej2-angular-grids";
import { MatSelectModule } from '@angular/material/select';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from 'src/app/material-module';

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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    GridModule,
    ScrollDispatchModule,
    DropDownListAllModule,
    MatDatepickerModule,
    MaterialModule
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

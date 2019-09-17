import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeAgreementsComponent } from './trade-agreements.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EditService,PageService,FilterService,SortService,ResizeService,GridModule, SearchService, ToolbarService, ForeignKeyService} from "@syncfusion/ej2-angular-grids";
import { MaterialModule } from 'src/app/material-module';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';


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
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ScrollDispatchModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    DropDownListAllModule,
  ],
  providers: [
    EditService,
    PageService,
    FilterService,
    SortService,
    ResizeService,
    SearchService,
    ToolbarService,
    ForeignKeyService

  ]
})
export class TradeAgreementsModule { }

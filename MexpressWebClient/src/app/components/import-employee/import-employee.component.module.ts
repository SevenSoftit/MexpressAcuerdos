import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ImportEmployeeComponent } from './import-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GridModule, FreezeService, SelectionService  } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatSelectModule } from '@angular/material/select';
// import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

const routes: Routes = [{ path: "" },];
@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    DropDownListAllModule,
    FormsModule,
    MatSelectModule,
    DatePickerAllModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    GridModule,
    UploaderModule,
    DropzoneModule],
  //declarations: [ ImportEmployeeComponent],
  providers: [PageService, SortService, FilterService, GroupService, FreezeService, SelectionService],
  entryComponents: [ImportEmployeeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    RouterModule,
  ]
})
export class ImportEmployeeModule { }
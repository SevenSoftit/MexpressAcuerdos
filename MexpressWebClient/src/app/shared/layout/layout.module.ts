import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from "./layout.component";
import { SidebarLeftComponent } from "./sidebar-left/sidebar-left.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxLoadingModule } from 'ngx-loading';
import {MatMenuModule} from '@angular/material/menu';
import { ArraySortPipe } from 'src/app/shared/helper/helperfilter.pipe';
import { LoadingModule } from '../loading/loading.module';

const routes: Routes = [{ path: "", component: LayoutComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    LoadingModule
    // NgxLoadingModule.forRoot({})
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarLeftComponent,
    ArraySortPipe
  ],
  exports: [RouterModule]
})   
export class LayoutModule {}

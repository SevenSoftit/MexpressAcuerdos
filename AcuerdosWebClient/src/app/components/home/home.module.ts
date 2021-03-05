import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { SharedModule } from "src/app/shared-module";

const routes: Routes = [
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HomeComponent],
  exports: [
    RouterModule,
  ],
  entryComponents: []
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    // component: LayoutComponent,
    children: [

    ]
  }, 



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

import { LoginComponent } from './access/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home',loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'listagem',
    loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule),
    // canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

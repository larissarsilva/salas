import { LoginComponent } from './access/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home',loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'crud',loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

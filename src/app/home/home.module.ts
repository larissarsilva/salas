import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {MatTableModule} from '@angular/material/table';
import { ComponentsModule } from '../components/components.module';
import { CrudModule } from '../crud/crud.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    ComponentsModule,
    CrudModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from './crud.service';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule
  ],
  providers: [CrudService],
})
export class CrudModule { }

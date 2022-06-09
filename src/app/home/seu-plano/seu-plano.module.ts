import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreatePlanoComponent } from './create-plano/create-plano.component';
import { ListPlanoComponent } from './list-plano/list-plano.component';
import { SeuPlanoRoutingModule } from './seu-plano-routing.module';



@NgModule({
  declarations: [ListPlanoComponent, CreatePlanoComponent],
  imports: [
    CommonModule,
    SeuPlanoRoutingModule
  ]
})
export class SeuPlanoModule { }

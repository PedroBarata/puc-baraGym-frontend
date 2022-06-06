import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeuPlanoRoutingModule } from './seu-plano-routing.module';
import { SeuPlanoComponent } from './seu-plano.component';



@NgModule({
  declarations: [SeuPlanoComponent],
  imports: [
    CommonModule,
    SeuPlanoRoutingModule
  ]
})
export class SeuPlanoModule { }

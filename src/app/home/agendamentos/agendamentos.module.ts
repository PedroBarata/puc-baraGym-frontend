import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosComponent } from './agendamentos.component';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';



@NgModule({
  declarations: [AgendamentosComponent],
  imports: [
    CommonModule,
    AgendamentosRoutingModule
  ]
})
export class AgendamentosModule { }

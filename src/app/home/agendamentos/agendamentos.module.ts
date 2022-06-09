import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { ListAgendamentoComponent } from './list-agendamento/list-agendamento.component';
import { CreateAgendamentoComponent } from './create-agendamento/create-agendamento.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListAgendamentoComponent, CreateAgendamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgendamentosRoutingModule
  ]
})
export class AgendamentosModule { }

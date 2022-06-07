import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAulaAtividadeComponent } from './list-aula-atividade/list-aula-atividade.component';
import { AulaAtividadeRoutingModule } from './aula-atividade-routing.module';


@NgModule({
  declarations: [
    ListAulaAtividadeComponent
  ],
  imports: [
    CommonModule,
    AulaAtividadeRoutingModule
  ]
})
export class AulaAtividadeModule { }

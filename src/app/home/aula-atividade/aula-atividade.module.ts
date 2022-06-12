import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAulaAtividadeComponent } from './list-aula-atividade/list-aula-atividade.component';
import { AulaAtividadeRoutingModule } from './aula-atividade-routing.module';
import { CreateAtividadeComponent } from './create-atividade/create-atividade.component';
import { FormsModule } from '@angular/forms';
import { LoadButtonModule } from 'src/app/common/components/load-button/load-button.module';
import { TablePaginationModule } from 'src/app/common/components/table-pagination/table-pagination.module';


@NgModule({
  declarations: [
    ListAulaAtividadeComponent,
    CreateAtividadeComponent
  ],
  imports: [
    CommonModule,
    AulaAtividadeRoutingModule,
    FormsModule,
    LoadButtonModule,
    TablePaginationModule
  ]
})
export class AulaAtividadeModule { }

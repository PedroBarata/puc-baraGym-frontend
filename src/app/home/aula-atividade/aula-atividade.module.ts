import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAulaAtividadeComponent } from './list-aula-atividade/list-aula-atividade.component';
import { AulaAtividadeRoutingModule } from './aula-atividade-routing.module';
import { CreateAtividadeComponent } from './create-atividade/create-atividade.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadButtonModule } from 'src/app/common/components/load-button/load-button.module';
import { TablePaginationModule } from 'src/app/common/components/table-pagination/table-pagination.module';
import { SubTitleModule } from 'src/app/common/components/sub-title/sub-title.module';
import { EditAtividadeComponent } from './edit-atividade/edit-atividade.component';


@NgModule({
  declarations: [
    ListAulaAtividadeComponent,
    CreateAtividadeComponent,
    EditAtividadeComponent
  ],
  imports: [
    CommonModule,
    AulaAtividadeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadButtonModule,
    TablePaginationModule,
    SubTitleModule
  ]
})
export class AulaAtividadeModule { }

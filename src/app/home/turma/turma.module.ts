import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadButtonModule } from 'src/app/common/components/load-button/load-button.module';
import { SubTitleModule } from 'src/app/common/components/sub-title/sub-title.module';
import { TablePaginationModule } from 'src/app/common/components/table-pagination/table-pagination.module';
import { CreateTurmaComponent } from './create-turma/create-turma.component';
import { ListTurmaComponent } from './list-turma/list-turma.component';
import { TurmaRoutingModule } from './turma-routing.module';



@NgModule({
  declarations: [ListTurmaComponent, CreateTurmaComponent],
  imports: [
    CommonModule,
    FormsModule,
    TurmaRoutingModule,
    LoadButtonModule,
    TablePaginationModule,
    SubTitleModule
  ]
})
export class TurmaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlocacaoComponent } from './list-alocacao/list-alocacao.component';
import { CreateAlocacaoComponent } from './create-alocacao/create-alocacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadButtonModule } from 'src/app/common/components/load-button/load-button.module';
import { AlocacaoRoutingModule } from './alocacao-routing.module';
import { TablePaginationModule } from 'src/app/common/components/table-pagination/table-pagination.module';
import { SubTitleModule } from 'src/app/common/components/sub-title/sub-title.module';



@NgModule({
  declarations: [
    ListAlocacaoComponent,
    CreateAlocacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlocacaoRoutingModule,
    LoadButtonModule,
    ReactiveFormsModule,
    TablePaginationModule,
    SubTitleModule
  ]
})
export class AlocacaoModule { }

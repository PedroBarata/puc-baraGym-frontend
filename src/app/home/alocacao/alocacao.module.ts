import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlocacaoComponent } from './list-alocacao/list-alocacao.component';
import { CreateAlocacaoComponent } from './create-alocacao/create-alocacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadButtonModule } from 'src/app/common/components/load-button/load-button.module';
import { AlocacaoRoutingModule } from './alocacao-routing.module';



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
    ReactiveFormsModule
  ]
})
export class AlocacaoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaRoutingModule } from './turma-routing.module';
import { ListTurmaComponent } from './list-turma/list-turma.component';



@NgModule({
  declarations: [ListTurmaComponent],
  imports: [
    CommonModule,
    TurmaRoutingModule
  ]
})
export class TurmaModule { }

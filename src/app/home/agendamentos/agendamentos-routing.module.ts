import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAgendamentoComponent } from "./create-agendamento/create-agendamento.component";
import { ListAgendamentoComponent } from "./list-agendamento/list-agendamento.component";

const routes: Routes = [
  { path: '', component: ListAgendamentoComponent },
  { path: 'novo-agendamento', component: CreateAgendamentoComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]

})

export class AgendamentosRoutingModule { };

import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AgendamentosComponent } from "./agendamentos/agendamentos.component";
import { ListAulaAtividadeComponent } from "./aula-atividade/list-aula-atividade/list-aula-atividade.component";
import { HomeComponent } from "./home.component";
import { CreatePlanoComponent } from "./seu-plano/create-plano/create-plano.component";
import { ListPlanoComponent } from "./seu-plano/list-plano/list-plano.component";
import { ListTurmaComponent } from "./turma/list-turma/list-turma.component";


export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'seu-plano',
      loadChildren: () => import('./seu-plano/seu-plano.module').then(m => m.SeuPlanoModule),
    },
    {
      path: 'agendamentos',
      component: AgendamentosComponent,
      loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule),
    },
    {
      path: 'turmas',
      component: ListTurmaComponent,
      loadChildren: () => import('./turma/turma.module').then(m => m.TurmaModule),
    },
    {
      path: 'aula-atividade',
      component: ListAulaAtividadeComponent,
      loadChildren: () => import('./aula-atividade/aula-atividade.module').then(m => m.AulaAtividadeModule),
    },
    { path: '', redirectTo: 'seu-plano', pathMatch: 'full' },
  ]
};

@NgModule({
  imports: [
    RouterModule.forChild([HOME_ROUTE])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

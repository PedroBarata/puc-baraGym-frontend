import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";


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
      loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule),
    },
    {
      path: 'turmas',
      loadChildren: () => import('./turma/turma.module').then(m => m.TurmaModule),
    },
    {
      path: 'aula-atividade',
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

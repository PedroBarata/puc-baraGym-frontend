import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AgendamentosComponent } from "./agendamentos/agendamentos.component";
import { HomeComponent } from "./home.component";
import { SeuPlanoComponent } from "./seu-plano/seu-plano.component";


export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'seu-plano',
      component: SeuPlanoComponent,
      loadChildren: () => import('./seu-plano/seu-plano.module').then(m => m.SeuPlanoModule),
    },
    {
      path: 'agendamentos',
      component: AgendamentosComponent,
      loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule),
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

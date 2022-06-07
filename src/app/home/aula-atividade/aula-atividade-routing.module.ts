import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListAulaAtividadeComponent } from "./list-aula-atividade/list-aula-atividade.component";

const routes: Routes = [
  { path: '', component: ListAulaAtividadeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class AulaAtividadeRoutingModule { };

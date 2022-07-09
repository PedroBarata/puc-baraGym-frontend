import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAtividadeComponent } from "./create-atividade/create-atividade.component";
import { EditAtividadeComponent } from "./edit-atividade/edit-atividade.component";
import { ListAulaAtividadeComponent } from "./list-aula-atividade/list-aula-atividade.component";

const routes: Routes = [
  { path: '', component: ListAulaAtividadeComponent },
  { path: 'nova-atividade', component: CreateAtividadeComponent },
  { path: ':id', component: EditAtividadeComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AulaAtividadeRoutingModule { };

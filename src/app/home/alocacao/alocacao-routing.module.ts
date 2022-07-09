import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAlocacaoComponent } from "./create-alocacao/create-alocacao.component";
import { EditAlocacaoComponent } from "./edit-alocacao/edit-alocacao.component";
import { ListAlocacaoComponent } from "./list-alocacao/list-alocacao.component";

const routes: Routes = [
  { path: '', component: ListAlocacaoComponent },
  { path: 'nova-alocacao', component: CreateAlocacaoComponent },
  { path: ':id', component: EditAlocacaoComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AlocacaoRoutingModule { };

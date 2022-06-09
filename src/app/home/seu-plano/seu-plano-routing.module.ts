import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreatePlanoComponent } from "./create-plano/create-plano.component";
import { ListPlanoComponent } from "./list-plano/list-plano.component";

const routes: Routes = [
  {
    path: '', component: ListPlanoComponent,
  },
  {
    path: 'novo-plano', component: CreatePlanoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class SeuPlanoRoutingModule { };

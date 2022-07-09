import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTurmaComponent } from "./create-turma/create-turma.component";
import { EditTurmaComponent } from "./edit-turma/edit-turma.component";
import { ListTurmaComponent } from "./list-turma/list-turma.component";

const routes: Routes = [
  { path: '', component: ListTurmaComponent },
  { path: 'nova-turma', component: CreateTurmaComponent },
  { path: ':id', component: EditTurmaComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class TurmaRoutingModule { };

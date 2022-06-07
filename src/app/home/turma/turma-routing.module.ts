import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListTurmaComponent } from "./list-turma/list-turma.component";

const routes: Routes = [
  { path: '', component: ListTurmaComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class TurmaRoutingModule { };

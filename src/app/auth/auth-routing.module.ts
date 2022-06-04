import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CriarContaComponent } from "./criar-conta/criar-conta.component";

import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "criar-conta", component: CriarContaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

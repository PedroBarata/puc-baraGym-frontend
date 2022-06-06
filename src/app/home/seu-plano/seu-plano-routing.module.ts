import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeuPlanoComponent } from "./seu-plano.component";

const routes: Routes = [
  { path: '', component: SeuPlanoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class SeuPlanoRoutingModule { };

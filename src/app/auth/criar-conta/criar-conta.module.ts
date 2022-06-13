import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoadButtonModule } from "src/app/common/components/load-button/load-button.module";
import { CriarContaRoutingModule } from "./criar-conta-routing.module";
import { CriarContaComponent } from "./criar-conta.component";



@NgModule({
  declarations: [CriarContaComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadButtonModule,
    CriarContaRoutingModule
  ]
})
export class CriarContaModule { }

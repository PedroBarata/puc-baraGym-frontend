import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoadButtonModule } from "src/app/common/components/load-button/load-button.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadButtonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }

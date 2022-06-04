import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    CriarContaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ]
})
export class AuthModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadButtonModule } from '../common/components/load-button/load-button.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    LoadButtonModule,
  ]
})
export class AuthModule { }

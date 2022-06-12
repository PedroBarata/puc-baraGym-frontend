import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubTitleModule } from 'src/app/common/components/sub-title/sub-title.module';
import { CreatePlanoComponent } from './create-plano/create-plano.component';
import { ListPlanoComponent } from './list-plano/list-plano.component';
import { SeuPlanoRoutingModule } from './seu-plano-routing.module';



@NgModule({
  declarations: [ListPlanoComponent, CreatePlanoComponent],
  imports: [
    CommonModule,
    FormsModule,
    SeuPlanoRoutingModule,
    SubTitleModule
  ]
})
export class SeuPlanoModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubTitleComponent } from './sub-title.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule],
  declarations: [SubTitleComponent],
  exports: [SubTitleComponent]
})
export class SubTitleModule { }

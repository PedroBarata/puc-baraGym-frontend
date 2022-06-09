import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadGlobalComponent } from './load-global.component';


@NgModule({
    imports: [CommonModule],
    declarations: [LoadGlobalComponent],
    exports: [LoadGlobalComponent]
})
export class LoadGlobalModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablePaginationComponent } from './table-pagination.component';


@NgModule({
    imports: [CommonModule],
    declarations: [TablePaginationComponent],
    exports: [TablePaginationComponent]
})
export class TablePaginationModule { }

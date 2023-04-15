import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { ChildTableComponent } from "./child-table/child-table.component";



@NgModule({
    declarations: [
        TableComponent,
    ],
    exports: [
        TableComponent,
    ],
    imports: [
        CommonModule,
        ChildTableComponent
    ]
})
export class TableModule { }

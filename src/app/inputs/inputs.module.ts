import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputsComponent
  ]
})
export class InputsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,   FormsModule
  ],
  //como usaremos el componente fuera de esta careta el componente lo exportamos
  exports: [
    IncrementadorComponent

  ]
})
export class ComponentsModule { }

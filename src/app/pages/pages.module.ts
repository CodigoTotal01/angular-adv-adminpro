import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";


//Funcionara solo en el mismo modulo, si no se EXPORTAN
@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule, //ng for y ng if entre otros
    SharedModule,   //? Modulo personalizado
    RouterOutlet, //Modulo router

  ],
  exports: [ //para que los components se usen en otros lados
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ]
})
export class PagesModule { }

//modulos de angular
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



//modulos propios
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";





//Funcionara solo en el mismo modulo, si no se EXPORTAN
@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    //angular
    CommonModule, //ng for y ng if entre otros
    FormsModule,
    //mios
    SharedModule,   //? Modulo personalizado
    RouterOutlet, //Modulo router
    ComponentsModule,

   ],
  exports: [ //para que los components se usen en otros lados
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ]
})
export class PagesModule { }

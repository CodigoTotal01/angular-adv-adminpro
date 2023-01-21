//modulos de angular
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



//terceros



//modulos propios
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';







//Funcionara solo en el mismo modulo, si no se EXPORTAN
@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AcountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  imports: [
    //angular
    CommonModule, //ng for y ng if entre otros
    FormsModule,
    //mios
    SharedModule,   //? Modulo personalizado
    RouterOutlet, //Modulo router
    ComponentsModule,
    ReactiveFormsModule // para los formularios reactivos y el builder


   ],
  exports: [ //para que los components se usen en otros lados
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AcountSettingsComponent,
    PromesasComponent,
  ]
})
export class PagesModule { }

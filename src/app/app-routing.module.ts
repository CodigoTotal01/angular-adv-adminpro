import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';  odrece directivas que se emplean en el html como nfIf
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProgressComponent} from "./pages/progress/progress.component";
import {Grafica1Component} from "./pages/grafica1/grafica1.component";
import {NopagefoundComponent} from "./pages/nopagefound/nopagefound.component";
import {PagesComponent} from "./pages/pages.component";
//! Modulo router
const routes :Routes =[
  {
    path: '',
    component: PagesComponent,
    //definiendo rutas hijas
    children: [
      //protegidas
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'grafica1',
        component: Grafica1Component
      },
      {
        path: '', //para el path vacio de todo el url
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },

  //publicas
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**', //cualquier otro path
  component: NopagefoundComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] //para que otros modulos puedan usuarlo fuera de su carpeta
})
export class AppRoutingModule { } //quien emplee El modulo  usara las rutas

import {NgModule} from '@angular/core';
// import { CommonModule } from '@angular/common';  odrece directivas que se emplean en el html como nfIf
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {PagesRoutingModule} from "./pages/pages.routing";
import {AuthRoutingModule} from "./auth/auth.routing";

//! Modulo router
const routes: Routes = [

  //path '/dashboard' PagesRouting
  // path '/auth' AuthRouting
  {
    path: '', //cualquier otro path
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**', //cualquier otro path
    component: NopagefoundComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    //rutas hijas sin carga de hijos de lazy load
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule] //para que otros modulos puedan usuarlo fuera de su carpeta
})
export class AppRoutingModule {
} //quien emplee El modulo  usara las rutas

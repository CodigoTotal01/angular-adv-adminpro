import {Routes, RouterModule, Router} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";


const routes : Routes = [
//! Para cuando no requiere renderizar en otro lugar y soolo estamos separando rutan tan solo coloca los path ycomponente pero nada de hijos

      //publicas
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },



]

@NgModule({
  imports: [ RouterModule.forChild(routes)], //*importando a lsistema principal de rutas
  exports: [RouterModule] //* Exportando las rutas como hijos
})
export class AuthRoutingModule{}

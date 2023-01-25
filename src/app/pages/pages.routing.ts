import {Routes, RouterModule, Router} from "@angular/router";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {AuthGuard} from "../guards/auth.guard";



const routes : Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    //definiendo rutas hijas
    canLoad:[AuthGuard],
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule) // no sentrega el mdulo, si lo usas usa canLodad
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes)], //*importando a lsistema principal de rutas
  exports: [RouterModule] //* Exportando las rutas como hijos
})
export class PagesRoutingModule{}

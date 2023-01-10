import {Routes, RouterModule, Router} from "@angular/router";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';

const routes : Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    //definiendo rutas hijas
    children: [ // se cargaran elen el router outlet de pages component
      //protegidas
      {
        path: '',  //? Ruta por defecto
        component: DashboardComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'account-settings',
        component: AcountSettingsComponent
      },
      {
        path: 'grafica1',
        component: Grafica1Component
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes)], //*importando a lsistema principal de rutas
  exports: [RouterModule] //* Exportando las rutas como hijos
})
export class PagesRoutingModule{}

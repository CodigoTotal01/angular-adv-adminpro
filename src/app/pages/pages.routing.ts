import {Routes, RouterModule, Router} from "@angular/router";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import {AuthGuard} from "../guards/auth.guard";
import {PerfilComponent} from "./perfil/perfil.component";
import {Usuario} from "../models/usuario.model";
import {UsuariosComponent} from "./mantenimientos/usuarios/usuarios.component";
import {MedicosComponent} from "./mantenimientos/medicos/medicos.component";
import {HospitalesComponent} from "./mantenimientos/hospitales/hospitales.component";
import {MedicoComponent} from "./mantenimientos/medicos/medico.component";

const routes : Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    //definiendo rutas hijas
    children: [ // se cargaran elen el router outlet de pages component
      //protegidas
      {
        path: '',  //? Ruta por defecto
        component: DashboardComponent, //data - objeto donde podemosenviar lo que queramos
        data: {
          titulo: "Dashboard"
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          titulo: "ProgressBar"
        }
      },
      {
        path: 'account-settings',
        component: AcountSettingsComponent,
        data: {
          titulo: "Ajustes de cuenta"
        }
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: {
          titulo: "Grafica 1"
        }
      }
      ,
      {
        path: 'promesas',
        component: PromesasComponent,
        data: {
          titulo: "Promesas"
        }
      }
      ,
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          titulo: "RxJS"
        }
      }
      ,
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          titulo: "Perfil de usuario"
        }
      },
      //!Mantenimientos -
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          titulo: "Usuario de Aplicacion"
        }
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: {
          titulo: "Hospitales aplicacion"
        }
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: {
          titulo: "Medicos aplicacion"
        }
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: {
          titulo: "Medicos aplicacion"
        }
      },
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes)], //*importando a lsistema principal de rutas
  exports: [RouterModule] //* Exportando las rutas como hijos
})
export class PagesRoutingModule{}

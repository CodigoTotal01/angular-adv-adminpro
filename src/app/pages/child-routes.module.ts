import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//rutas
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import {AcountSettingsComponent } from './acount-settings/acount-settings.component';
import {PromesasComponent } from './promesas/promesas.component';
import {RxjsComponent } from './rxjs/rxjs.component';
import {PerfilComponent} from "./perfil/perfil.component";
import {UsuariosComponent} from "./mantenimientos/usuarios/usuarios.component";
import {MedicosComponent} from "./mantenimientos/medicos/medicos.component";
import {HospitalesComponent} from "./mantenimientos/hospitales/hospitales.component";
import {MedicoComponent} from "./mantenimientos/medicos/medico.component";
import {BusquedasComponent} from "./busquedas/busquedas.component";
import {AdminGuard} from "../guards/admin.guard";
import {RouterModule, Routes} from "@angular/router";

const childRoutes: Routes =  [
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
  {
    path: 'buscar/:termino',
    component: BusquedasComponent,
    data: {
      titulo: "Busqueda aplicacion"
    }
  },
  //!Mantenimientos

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
  //ADMIN GUARD - Administradores
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard],
    data: {
      titulo: "Usuario de Aplicacion"
    }
  },
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes)], //*importando a lsistema principal de rutas
  exports: [RouterModule] //* Exportando las rutas como hijos
})
export class ChildRoutesModule { }

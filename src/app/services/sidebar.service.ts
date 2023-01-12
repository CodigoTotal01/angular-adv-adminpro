import { Injectable } from '@angular/core';

//  / en una url es desde el servidor, nada es basicamente de la posicion finnal añade
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
//opciones del menu del sashboard 
  menu: any[] =[
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu:[
        {
          titulo: "Main", url: "/"
        },
        {
          titulo: "ProgressBar", url: "progress"
        },
        {
          titulo: "Main", url: "grafica1"
        },
        {
          titulo: "Promesas", url: "promesas"
        },
        {
          titulo: "RxJs", url: "rxjs"
        },
      ]
    }
  ]
  constructor() { }
}

import { Injectable } from '@angular/core';
//no es necesario añadirlo a los proveedores de los modulos
//Algunos services serann utils para informacion que debe estar pendiente durante toda la pagina o consumo de apis
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //cuando la aplicacion se genera 
  public linkTheme = document.querySelector("#theme");
  constructor() {
    //tema por defecto 
    const url = localStorage.getItem('theme') || `./assets/css/colors/purple-dark.css`;
    this.linkTheme?.setAttribute('href', url)
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url)
    //registrandolo en el local storage para que no de problemas 
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  //Escucha el selector de cambios para modificar y msotrar la palolmita
  checkCurrentTheme(): void {
    //! cuando es pesado no se recomienda de esta forma
    const links = document.querySelectorAll('.selector');    //eliiminar clase working para que no estorbe 
    links.forEach(element => {
      element.classList.remove('working');
      //obtener atirbuto personalizadao 
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute("href");
      //comparar que coincidan el fondo con el seleccionado
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working')
      }
    })
  }


}




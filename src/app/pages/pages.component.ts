import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
//importar una funcion desde su ruta para usarlo
import {customInitFunctions} from   '../../../src/assets/js/custom.js'
//definir funciones globales par que no marque como error 





@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
      //inicializar todas las librerias, pero al estar algo de manera global tenemos que decirle que confie en nosotros que la use ahroa con funciones :D 
      customInitFunctions();
 
  }



}

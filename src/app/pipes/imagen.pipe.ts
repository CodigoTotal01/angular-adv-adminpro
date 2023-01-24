import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";
import {retry} from "rxjs/operators";
//Los pipes se agrega n a los modulos como ocomponentes dentro del declaration
@Pipe({ //! Utiles para modificar la parte visual de la informacion
   name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  //ENV
  public base_url = environment.base_url;

  transform(img: string, tipo: 'usuario'| 'medicos' | 'hospitales'): string {

    if(!img){
      return `${this.base_url}/upload/usuarios/no-image`
    }
    else if(img.includes('https')) {
      return img;
    }
    else if(img) {
      return `${this.base_url}/upload/${tipo}/${img}`
    }else{
      return `${this.base_url}/upload/usuarios/no-image`
    }
  }

}

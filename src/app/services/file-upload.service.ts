import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
  } //Sincrono

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`
      const formData = new FormData(); // data para enviar al fetch
      formData.append('imagen', archivo)//indicar el archivo a subirr

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json(); // las respuesta del body siembre bien empaquetada

      if(data.ok){
      return data.nombreArchivo;
      }else{
        console.log(data.msg)
        return false
      }

      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}

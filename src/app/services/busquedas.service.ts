import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Usuario} from "../models/usuario.model";
import {Hospital} from "../models/hospital.model";
import {Medico} from "../models/medico.models";
//variables
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() { //encabezado -token
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) { //solo se pueden pasar los siguientes valores

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`
    //    return this.http.get<{total: Number, usuarios: Usuario[]}>(url, this.headers);
    return this.http.get<any[]>(url, this.headers).pipe(
      map(
        (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);


            case 'hospitales':
              return this.trasformarHospitales(resp.resultados);

            case 'medicos':
              return this.trasformarMedicos(resp.resultados);

            default:
              return []
          }
        }
      )
    )
  }


  //! Manera sencilla de manejar un listado de tipo a any a una clase que queramos
  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(usuario =>
      new Usuario(usuario.nombre, usuario.email, '', usuario.img, usuario.google, usuario.role, usuario.uid)
    )
  }


  private trasformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }

  private trasformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }


  busquedaGlobal(termino: string){

    const url = `${base_url}/todo/${termino}`
    //    return this.http.get<{total: Number, usuarios: Usuario[]}>(url, this.headers);
    return this.http.get<any[]>(url, this.headers);

  }


}


import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {LoginForm} from "../interfaces/login-form.interface";

import {tap} from "rxjs/operators";


//HTTP client -> base a observables
//obtener un valor de los enviroment (objeto)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {





  // inyectar servicio
  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    // ruta a cual hacer el port - contenido del body
    return this.http.post(`${base_url}/usuarios`, formData); //retorna un Observable subscribirce por lo general en el componente que lo use
  }
//retorna un Observable subscribirce por lo general en el componente que lo use
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe( //hac ealgo antes mas no modifica el glojo el dato
      tap((resp:any) => {
        //guardar en localStorage
        localStorage.setItem('token',resp.token)
        //!cuando se pasa un valor atraves de una funcion sin valor incluir su valor any
      })
    );
  }
}

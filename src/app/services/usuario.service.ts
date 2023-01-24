import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {LoginForm} from "../interfaces/login-form.interface";

import {tap, map, catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Usuario} from "../models/usuario.model";
import {CargarUsuario} from "../interfaces/cargar-usuarios.interface";
import Swal from "sweetalert2";


//HTTP client -> base a observables
//obtener un valor de los enviroment (objeto)
const base_url = environment.base_url;


//Para poder quitar la sesion del usuario totalmente de google -> ya que se mantiene
declare const google: any;




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario!: Usuario;
  // inyectar servicio
  constructor(private http: HttpClient, private router: Router, private ngZone:NgZone) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';

  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE'|'USER_ROLE'{
    return this.usuario.role!;
  }
  validarToken(): Observable<boolean> {
    //ruta - headers
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, google, nombre, role, uid, img=''} = resp.usuario;
        //! Crear una instancia del objeto para poder usar sus propiedades no basta con chancar los datos
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        this.guardarLocalStorage('token', resp.token)
        this.guardarLocalStorage('menu', resp.menu)
        return true;
    }),
      catchError(error=> of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    // ruta a cual hacer el port - contenido del body
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap(
        (resp: any) => {
          this.guardarLocalStorage('token', resp.token)
          this.guardarLocalStorage('menu', resp.menu)
        }
      )
    ); //retorna un Observable subscribirce por lo general en el componente que lo use
  }
//retorna un Observable subscribirce por lo general en el componente que lo use

//puedes sar interfaces par adefirnor el contenido de la data o hacerlo de una
  actualizarPerfil(data: {emai: string, nombre: string, role: string}){
    data = {
      ...data,
      role: this.usuario.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe( //hac ealgo antes mas no modifica el glojo el dato
      tap((resp: any) => {

        this.guardarLocalStorage('token', resp.token)
        this.guardarLocalStorage('menu', resp.menu)

        //guardar en localStorage
        //!cuando se pasa un valor atraves de una funcion sin valor incluir su valor any
      })
    );
  }


  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      //efecto secundario
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem(token,JSON.stringify(resp.menu));
      })
    );
  }


  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('palaciostarrillochristian@gmail.com', done => {
      this.router.navigateByUrl('/login');
    });
  }

  get headers(){
    return {headers: {
      'x-token': this.token,
    }}
  }


  cargarUsuarios(desde: number = 0){
    const url=`${base_url}/usuarios?desde=${desde}`
      //    return this.http.get<{total: Number, usuarios: Usuario[]}>(url, this.headers);
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(usuario =>
          new Usuario(usuario.nombre, usuario.email, '', usuario.img, usuario.google, usuario.role, usuario.uid)
        );
        return {
          usuarios,
          total: resp.total
        }
      })
    )

  }


  eliminarUsuario(usuario: Usuario){
    const url=`${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }


  guardarUsuario(usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers).subscribe(resp => {
      console.log(resp)
    });

  }
  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem(token, token);
    localStorage.setItem(token,JSON.stringify(menu));
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "404287457797-vth9au1flpgdr5uq85nn3tk958usai4o.apps.googleusercontent.com",
      callback: (response:any) => {return this.handleCredentialResponse(response)}
    });
  }

  handleCredentialResponse(response: any){
    this.loginGoogle( response.credential).subscribe(
      resp => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      }
    )
  }

}

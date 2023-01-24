//principales al inicio y opioneales al final
import {environment} from "../../environments/environment";

const base_url = environment.base_url;
// ?: opciones
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE'|'USER_ROLE',
    public uid?: string

  ) {}

  get imagenUrl(){
//http://localhost:3000/api/upload/usuarios/e3375af9-5eaa-48e2-a2d4-bd0954611a20.jpg
    //para que no nos retorne una imagen con el path de google

    if(this.img?.includes("https")){
      return this.img
    }

    if(this.img){
      return `${base_url}/upload/usuarios/${this.img}`
    }else{
      return `${base_url}/upload/usuarios/no-image`
    }
  }

}

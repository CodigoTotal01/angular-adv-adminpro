import { Component } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  public imgUrl = '';
  public usuario !: Usuario;
  constructor(private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
    console.log(this.usuario)
  }

  logout(){
    this.usuarioService.logout();
  }

  //hacer referencia al modelo



}

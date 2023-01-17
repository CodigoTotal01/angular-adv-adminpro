import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario.model";
import {UsuarioService} from "../../services/usuario.service";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  public perfilForm!: FormGroup; //se puede colocar en los fromGroup html
  public usuario!: Usuario //Actualizara la informacion automaticamente ya que todos los objetos se pasan por referencia osea estan todos conectados entre si, los services emplean singletosn
  public imagenSubir!: File; // desde el imput
  constructor(private fb:FormBuilder, private usuarioService: UsuarioService, private fileuploadService: FileUploadService) {
    this.usuario = usuarioService.usuario; //! puntero de la informacion quien literal le pasa la info a todos
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group(
      {
        nombre: [this.usuario.nombre, Validators.required],
        email: [this.usuario.email, [Validators.required, Validators.email]]
      }
    )
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value)
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp=> {

      const {nombre, email} = this.perfilForm.value; // extrallendo valores del formulario, aunque normal podemos desde la respuesta
      this.usuario.nombre =nombre;
      this.usuario.email = email;
    });
  }

  cambiarImagen(event: any){
    this.imagenSubir = (event.target as HTMLInputElement).files![0];

  }
  subirImagen(){
    this.fileuploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!).then(img => this.usuario.img = img)
  }

}

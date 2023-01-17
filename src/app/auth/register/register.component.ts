import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";



import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;


  //formulario -> agirnar form html -> [formgroup]
  public registerForm = this.fb.group({
      //como lucira mi formulario valor - validacion
      nombre: ["Christian", [Validators.required]],
      email: ["codigototal01@gmail.com", [Validators.required]],
      password: ["123456", Validators.required],
      password2: ["123456", Validators.required],
      terminos: [true, Validators.required]
    },
    //validadores - validadores asincronos
    {
      validators: this.passwordIguales("password", "password2")
    }
  );

  //obtenemos el servicio form builder para crear nuestro formulario
  constructor(private fb: FormBuilder,
  private usuarioService: UsuarioService) {
  }

//obtener todos los campos -> recuerda asociar -> formControlName="nombre" -> para obtener los campos con  this.registerForm.value
  crearUsuario() {
    this.formSubmitted = true;


    //si el formario es valid
    if (this.registerForm.invalid) {
      return ;
    }

    //realizar posteo
    //enviar toda la data del formulario
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      console.log("Usuario Creado")
      console.log(resp)
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

  campoNoValido(campo: string): boolean {
    //obtener campo -> .get

    //si el objeto posiblemnete sea nullo decirle que puede o no vener
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true
    }
    return false;
  }a


  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


  //evaluamos si las contraseñas no son validas -pendiente a cambios
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }


  }


  //retornar un objeto- opner eror en el campo ->
  passwordIguales(pass1Name: string, pass2Name: string) {
    //retornar uan funcion
    return (formGroup: FormGroup) => { //obtener campos
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      //contraseñas validar -> dejarlas pasar
      if(pass1Control?.value  === pass2Control?.value){
        pass2Control?.setErrors(null);

      }else{
        pass2Control?.setErrors({noEsIgual: true});// enviamos traves de la funcion on objeto consigo dentro de la seugnda contraseña
      }
    }
  }


  ngOnInit(): void {
  }

}

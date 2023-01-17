
import { Router } from '@angular/router';
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";


declare const google: any; // cuando deu n paquete de terceros no tenemos referencia

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  // atento a algun cambio o simplemente el DOm
  @ViewChild('googleBtn') googleBtn?: ElementRef;


  public formSubmitted = false;


//! El error exigia que se pasaro los datos de email y el password pero este inicializado los vaores desde el contructor
 public loginForm: FormGroup; //Agregar el loginForm en un FormGroup, e importar desde: import { FormGroup } from '@angular/forms';


  constructor(private router: Router, private fb : FormBuilder, private usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }
  ngOnInit(): void {

  }

  ngAfterViewInit():void {
    this.googleInit();
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "404287457797-vth9au1flpgdr5uq85nn3tk958usai4o.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      {theme: "outline", size: "large"}  // customization attributes
    );
  }

  handleCredentialResponse(response: any){

    //obtenemos el token de la base de datos
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential).subscribe(
      resp => {
        this.router.navigateByUrl('/');
      }
    )

  }

  login(){

    //enviando el post
    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      //? recordar email del usuario
      if(this.loginForm.get('remember')?.value){

        localStorage.setItem('email', this.loginForm.get('email')?.value)
      }else{
        //quitar item del localStorage
        localStorage.removeItem('email')
      }
    }, (err) => {
      console.error(err)
    })
  }

}

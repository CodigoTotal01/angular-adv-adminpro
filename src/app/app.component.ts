import {AfterViewInit, Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "./services/usuario.service";

declare const google: '' | any; // cuando deu n paquete de terceros no tenemos referencia


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'adminpro';

  constructor(private router: Router, private fb : FormBuilder, private usuarioService: UsuarioService, private ngZone:NgZone) {}

  ngAfterViewInit():void {

    this.googleInit();
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "404287457797-vth9au1flpgdr5uq85nn3tk958usai4o.apps.googleusercontent.com",
      callback: (response:any) => {return this.handleCredentialResponse(response)}
    });
  }

  handleCredentialResponse(response: any){

    //obtenemos el token de la base de datos
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential).subscribe(
      resp => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      }
    )

  }

}

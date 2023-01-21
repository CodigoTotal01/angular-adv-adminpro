import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario.model";
import {BusquedasService} from "../../../services/busquedas.service";
import Swal from "sweetalert2";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0

  public cargando: boolean = true;


  public imgSubs!: Subscription;

  constructor(public modalImagenService: ModalImagenService, private usuarioService: UsuarioService, private busquedasService: BusquedasService) {
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    //la subcripcion queda pendiente a cierrre
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(1000)
    ).subscribe(img => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(
      ({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios; //solventar posicion anterior
        this.cargando = false;
      }
    )
  }

//ira aumentando de 5 en 5
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      console.log(this.desde)
      this.desde -= valor; //se queda clavado en su valor real(5) -> (desde antes)25 - 20 (desde depues) = 5(valor) -> entonces -> desde  == usuarios totales por eso no continua
    }
    this.cargarUsuarios();
  }


  //cuando tecgamos unos pocos valores o un solo input hacersolo referencia local
  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      console.log(this.usuarios)
      return;
    }
    this.busquedasService.buscar('usuarios', termino).subscribe(resultados => {
      this.usuarios = resultados
    })
  }


  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede eliminarce asi mismo', 'error')
      return;
    }

    console.log('esto no devbeserver')


    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a putno de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp => {
            this.cargarUsuarios();

            Swal.fire(
              'Usuario Borrado!',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );

          }
        );


      }
    })
  }

  cambiarRole(usuario: Usuario) {
    console.log(usuario)

    this.usuarioService.guardarUsuario(usuario);
  }


  /****Abrir modal****/
  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}

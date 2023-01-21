import { Component, OnInit } from '@angular/core';
import {ModalImagenService} from "../../services/modal-imagen.service";
import Swal from "sweetalert2";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!: File; // desde el imput

  public imgTemp: any;

  constructor(public modalImagenService :ModalImagenService, public fileuploadService: FileUploadService) { }


  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp= null
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(event: any): any{
    let file = (event.target as HTMLInputElement).files![0];
    this.imagenSubir = file;
    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader(); //js
    //transformar imagen de url a archivo
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }


  subirImagen(){
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileuploadService.actualizarFoto(this.imagenSubir, tipo, id).then(img => {
      Swal.fire('Imagen subida', 'La imagen se subio correctamente', 'success');

      this.modalImagenService.nuevaImagen.emit(img); //emitir calor
      this.cerrarModal();
    }).catch(err => {
      console.log(err)
      Swal.fire('Error al subir la imagen', 'Asegurece que el archivo sea una imagen', 'error')

    })
  }


}

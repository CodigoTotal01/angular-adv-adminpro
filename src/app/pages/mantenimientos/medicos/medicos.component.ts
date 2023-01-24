import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicoService} from "../../../services/medico.service";
import {MedicoComponent} from "./medico.component";
import {Medico} from "../../../models/medico.models";
import {Hospital} from "../../../models/hospital.model";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {BusquedasService} from "../../../services/busquedas.service";
import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private medicoService:MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService : BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(1000)
    ).subscribe(img => {
      this.cargarMedicos();
    })
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){
    this.cargando= true;
    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;

    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('hospitales', medico._id!, medico.img)
  }

  buscar(termino: string){
    if(termino.length === 0){
      this.cargarMedicos();
      return;
    }
    this.busquedaService.buscar('medicos', termino).subscribe((resp: any) => {
      this.medicos = resp;
    })
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico._id!).subscribe(
          resp => {
            this.cargarMedicos();

            Swal.fire(
              'Usuario Borrado!',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );

          }
        );


      }
    })
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital.model";
import Swal from "sweetalert2";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";
import {BusquedasService} from "../../../services/busquedas.service";


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public estaCargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) {
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(1000)
    ).subscribe(img => {
      this.cargarHospitales();
    })
  }

  cargarHospitales() {

    this.estaCargando = true;

    this.hospitalService.cargarHospitales().subscribe(
      hospital => {
        this.estaCargando = false;
        this.hospitales = hospital
      }
    );
  }

  guadarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id!).subscribe(resp => {
      Swal.fire('ELiminado', hospital.nombre, 'success');
      this.cargarHospitales();
    });
  }

  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      showCancelButton: true
    });

    if (value?.trim().length! > 0) {
      this.hospitalService.crearHospital(value!).subscribe(({hospital}) => {
        this.hospitales.push(hospital);
      });
    }


  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img)
  }

  buscarHospital(termino: string){
    if(termino.length === 0){
      this.cargarHospitales();
      return;
    }
    this.busquedaService.buscar('hospitales', termino).subscribe((resp: any) => {
      this.hospitales = resp;
    })


  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital.model";
import {MedicoService} from "../../../services/medico.service";
import {Medico} from "../../../models/medico.models";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {


  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;


  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //ten en cuenta tus rutas
    this.activatedRoute.params.subscribe(({id}) => {
      this.cargarMedico(id)
    })


    //

    this.cargarHospitales();

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['1', Validators.required]
    });

    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId) as Hospital; //retorna los elementos

    })
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoPorId(id).pipe(
      delay(1000)
    ).subscribe((medico: Medico) => {


      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`)

      }

        const {nombre} = medico;
        const {_id} = medico.hospital!;

        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({nombre, hospital: _id}); // volver a seteal los valores

      }
    );

  }


  guardarMedico() {

    const {nombre} = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {...this.medicoForm.value, _id: this.medicoSeleccionado._id}

      this.medicoService.actualizarMedico(data).subscribe(
        resp => {
          Swal.fire('Creado', `${nombre}`, 'success');
        }
      );
    } else {
      //crear
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre}`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        }
      )
    }


  }


  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    })
  }


}

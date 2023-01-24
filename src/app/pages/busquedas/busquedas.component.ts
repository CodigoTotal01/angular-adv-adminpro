import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BusquedasService} from "../../services/busquedas.service";
import {Usuario} from "../../models/usuario.model";
import {Medico} from "../../models/medico.models";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => {
      this.busquedaGlobal(termino)
    })
  }


  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal(termino).subscribe(({usuarios,medicos, hospitales}: any) => {
      this.usuarios = usuarios;
      console.log(this.usuarios )
      this.medicos = medicos;
      this.hospitales= hospitales
    })
  }



}

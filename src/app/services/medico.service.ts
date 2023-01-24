import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hospital} from "../models/hospital.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Medico} from "../models/medico.models";
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  constructor(
    private http: HttpClient

  ) { }
// GETERS
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {headers: {
        'x-token': this.token,
      }}
  }

  //Methods

  cargarMedicos(){
    const url=`${base_url}/medicos`;

    return this.http.get<{ok: boolean, medicos: Medico[]} >(url, this.headers).pipe(
      map((resp: {ok: boolean, medicos: Medico[]} ) => resp.medicos)
    );
  }

  crearMedico(medico: {nombre: string, hospital: string } ){

    const url=`${base_url}/medicos`;

    return this.http.post<{ok: boolean, medico: Hospital} >(url, medico,this.headers);
  }

  obtenerMedicoPorId(id: string){
    const url=`${base_url}/medicos/${id}`;

    return this.http.get<{ok: boolean, medico: Medico} >(url, this.headers).pipe(
      map((resp: {ok: boolean, medico: Medico} ) => resp.medico)
    );
  }

  //! Falta su manito
  actualizarMedico(medico: Medico){

    const url=`${base_url}/medicos/${medico._id}`;

    return this.http.put<{ok: boolean, hospital: Hospital} >(url, {medico},this.headers);
  }

  borrarMedico(_id: string){

    const url=`${base_url}/medicos/${_id}`;

    return this.http.delete(url, this.headers);
  }



}

import {Hospital} from "./hospital.model";

interface _MedicoUser{
  _id: string;
  nomre: string;
  img: string;
}

export class Medico{
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _MedicoUser,
    public hospital?: Hospital
  ) {
  }
}

//Interfas - luego cuando se use metodos hacer con clases
export class Hospital{
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _hospitalUser,
  ) {}
}

interface  _hospitalUser{
  nombre: string;
  _id: string;
  img: string;
}

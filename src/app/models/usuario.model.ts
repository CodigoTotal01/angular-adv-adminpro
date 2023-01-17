//principales al inicio y opioneales al final

// ?: opciones
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string

  ) {}

}

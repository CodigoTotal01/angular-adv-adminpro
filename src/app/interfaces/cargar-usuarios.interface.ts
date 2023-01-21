//interfas para obtener los usuarios

import {Usuario} from "../models/usuario.model";

export interface CargarUsuario {
  total: number,
  usuarios: Usuario[];
}

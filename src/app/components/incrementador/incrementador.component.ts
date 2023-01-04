import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass}`
  }
  //indicar que puede recivir un valor/propiedad  desde el padre componente 
  //Dentro del input poner entre comillas el nombre a obtener 
  @Input('valor') progreso: number = 10;
  @Input() btnClass: string = "btn-primary"


  //! Enviar informacion desde el hijo al padre -> salida -> output
  //eventemiter -> dispara evento -> tipo generico -> pasarle los valores cuanodo se mllame empleando el metodo emit 
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();



  //se llama con el mismo nombre del metodo que se usa como atributo 
  get getPorcentaje() {

    return `${this.progreso}%`
  }

  cambiarValor(valor: number): number {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
    return this.progreso;
  }
  //oncahnge para cuando se modifica el valor de un input, este  caso tre su valor
  onChange(nuevoValor: number){
    if(nuevoValor >=100){
      this.progreso = 100;
    }else if (nuevoValor <= 0){
      this.progreso = 0;
    }else {
      this.progreso = nuevoValor
    }
    this.valorSalida.emit( this.progreso );
  }

  // [] indicar a angular que el valor vendra de la contra parte de js -> si es oslo texto quitalo de la duirectiva o propiedad que creamos -> pero lo confundimos asi que siempre entre llaves 
  //[()] emite y recive valores 
  // [style.width]="progreso + '%'"  feo hay que mejorarlo
  // () evento -> definir que queremos hacer cuando se reciva el evento

}

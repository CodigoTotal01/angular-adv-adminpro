import { Component, OnDestroy, OnInit } from '@angular/core';
//interval tya tiene una parte de temposizador 
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{


  public intervalSubs!: Subscription;


  constructor() {
    //observer de tipo subscriber -> nos dira como esta el obserbable y como esta la infomracion que ocntiene 
    //! para hablar a la pared, para que hare algo? 
    //! el procedimiento en memoria asi que cuidado con el rendimiento 
    
    //next cuando se eimite un siuiente valor y cuando se completa 

    //pipe trasnforma la informacion de un observable 
    // this.retornaObservable().pipe(
    //   //! podemos indicar la cantidad de veces ;0
    //   retry(1) //el error lo optenemos con retry, y lo intentara hacer itra vez, pero ya tendra el valor de dos 
    // )
    //   .subscribe(
    //     {
    //       next: (v) => console.log("subs: ", v),
    //       error: (e) => console.error(e),
    //       complete: () => console.info('complete')

    //     }
    //   );



      //! se puede mandar los argumentos enviar directamentnete a la funcion que se define dentro 
      this.intervalSubs =  this.retornaIntervalo().subscribe(console.log); 


  }
  //cuando el componente se elimina 
  ngOnDestroy(): void {
    //! para emplearar el unsubcribe
    this.intervalSubs.unsubscribe();
  }


  retornaObservable() : Observable<number>{
    let i = -1;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => { //! funcion anonima nunca se cancelara, igualar a una constante 

        i++;
        //next para el siguiente valor a emitir
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          //notificar que ya se cancelo 
          observer.complete(); // void, para indicar que termino 
        }

        if (i === 2) {
          i=0;
          observer.error("llego al valor del 2 "); // void, para indicar que termino 
        }

      }, 1000)
      //los observable deben emiteir algun valor de retorno -> 
    });



  }



  //map para transformar la informacion de un opservable de el padre 
  retornaIntervalo(): Observable<number>{
    const intervalo$ = interval(500)
    //take toma 4 valores, interesante
    .pipe( //! recuerda su ocntenido es async 
    take(10), // tomar calores de un intervalo ,
      map(valor => { // modificar flujo de datos 
        return valor + 1; /// 0 => 1
      }), //! filter wrecive un callback 
      filter(valor => valor % 2 == 0), // para las condiciones chevere 
  
    );
    return intervalo$;
  }



}

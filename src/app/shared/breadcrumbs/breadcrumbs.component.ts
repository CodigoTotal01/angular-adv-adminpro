import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo!: string;
  public tituloSubs$!: Subscription;
  //leer algo que esta en el router 
  constructor(private router: Router) {


    this.tituloSubs$ = this.getArgumentosRuta().
      subscribe(({ titulo }) => {
        //Property 'titulo' comes from an index signature, so it must be accessed with ['titulo'].
        this.titulo = titulo;
        document.title = `Admin Pro - ${titulo}`;

      });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta() {

    //pipe use aplciar filtro
    return this.router.events
      // nos viene el del padre asi que solo fijare en el hijo
      //deveretornar true or false 

      //! duda (?)
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: any) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),

      );
  }

}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';

import {PagesModule} from "./pages/pages.module";
import {AuthModule} from "./auth/auth.module";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";


@NgModule({
  declarations: [ //componentes
    //! Si no se declaran, dara errores cuando se intenten usar dentro de otros modulos, porque no existen
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [ //modulos
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // //promesas JS de toda la vida, recive un callback, no es asincrona directamente -> 
    // const promesa = new Promise((resolve, reject) => {
    //   //cuando la proimesa se ejecuta correctamente
    //   if(false){
    //     resolve("Hola mundo");

    //   }else{
    //     //desde cierta version de node la primesa no sera atrapada o si no tiene control sobre el error igual seguira funcionando
    //     reject('Algo salio mal');
    //   }
    // });

    // //escuchando cuando la promesa se resuelva
    // promesa.then((mensaje)=>{
    //     console.log(mensaje)
    // }).catch(error =>{
    //   console.log(error)
    // });

    // //promesas se emplean cuando se necesita ejecutar DESPUES de algo 


    //metodos que retornan promesas 

    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    })

  }


  getUsuarios() {

   return new Promise(resolve => {
      //fetcha apique retorna una promesa
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    })



  }



}

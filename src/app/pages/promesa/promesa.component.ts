import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styleUrls: ['./promesa.component.css']
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

    // const promesas = new Promise( ( resolve,reject ) => {

    //   if(false){
    //     resolve("hola mundo");
    //   }
    //   else
    //   {
    //     reject ("Algo salio mal")
    //   }
    // });

    // promesas.then( (mensaje) =>{
    //   console.log(mensaje);
    // }).catch( error =>
    //   console.log("error en mi promesa"));
    

    // console.log("fin init");
  }

  getUsuarios(){

    return new Promise( resolve =>{
      fetch('https://reqres.in/api/users?page=2').then( resp=>{
        resp.json().then( body => resolve(body.data))
      })
    });
  
    //return promesa;
  
  }




}

import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry , take , map , filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy  {

  intervalSubs: Subscription;

  constructor() { 

    this.intervalSubs= this.retornaIntervalo()
    .subscribe( console.log )


  /// retry 1 . intenta una vez mas . si no se manda nada intenta infinitamente
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //   valor => console.log(valor),
    //   error => console.warn(error),
    //   ()=> console.info('Terminado'));
    
  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }



// take lo hace tantas veces como sea necesario
// map recibe el valor del observable y lo transforma
// se van ejecutando lso operadores en orden
retornaIntervalo() : Observable<number> {
  return  interval(300)
            .pipe (
              //take(10),
              map( valor =>  valor+1 ),
              filter ( valor => valor % 2 === 0 ? true : false),
              );

}

  retornaObservable() : Observable<number>{
    let i = -1;
  
    const obs$ = new Observable<number> ( observer => {

      const intervalo = setInterval( () =>{
      i++;
      observer.next(i);

      if(i===4)
      {
      clearInterval(intervalo);
      observer.complete();
      }

      if(i===2){
        observer.error('i llego a 2');
      }

      },1000)
    });

    return obs$;
  }


}

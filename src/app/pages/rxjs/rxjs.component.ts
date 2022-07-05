import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent  {

  constructor() { 

  /// retry 1 . intenta una vez mas . si no se manda nada intenta infinitamente
    this.retornaObservable().pipe(
      retry(1)
    ).subscribe( 
      valor => console.log(valor),
      error => console.warn(error),
      ()=> console.info('Terminado'));
    
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

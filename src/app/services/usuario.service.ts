import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
// tap dispara efecto secundario . en este caso lo uso para guardar el token


const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient,
              private router : Router) { }
  
  logout(){
      localStorage.removeItem('token');  
      this.router.navigateByUrl('/login');
  }

  validarToken(){
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token);
      }),
      map( resp=>true),
      catchError( error =>of(false))  // retorna un nuevo observable
    )
  }


  crearUsuario(formData : RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp:any)=> 
        {localStorage.setItem('token', resp.token)
        }))
  }

  login(formData : LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp:any)=> 
                    {localStorage.setItem('token', resp.token)
                    }))
  }
  



}

import { Component} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formSubmitted=false;
  
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' ,[Validators.required , Validators.email] ],
    password: ['',Validators.required],
    remember: [false]
  });

  
  constructor( private router: Router ,
              private fb: FormBuilder,
              private usuarioService : UsuarioService) { }

 
  login() {
  
  this.usuarioService.login(this.loginForm.value)
            .subscribe( resp => {
            
              if(this.loginForm.get('remember').value){
                localStorage.setItem('email',this.loginForm.get('email').value);
              }
              else
              {
                localStorage.removeItem('email');
              }
              
              this.router.navigateByUrl('/');

            }, err =>{
              Swal.fire( 'Error',err.error.msg, 'error' );
            })
    

  }



}

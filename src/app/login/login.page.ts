import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

  login: FormGroup;
  mensajeLogin: string = '';

  ngOnInit() {
  }

  public usuario : any[] = [
    {nombre:'Juan',clave:'12345678'}
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.login = this.fb.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }
    enviar(){
      const nombreIngresado = this.login.value.nombre;
      const claveIngresada = this.login.value.clave;

      const usuarioValido = this.usuario.find(
        (usuario) => usuario.nombre === nombreIngresado && usuario.clave === claveIngresada);


        if (usuarioValido) {
          this.mensajeLogin = '';
          console.log('Usuario válido');
          localStorage.setItem('usuario',JSON.stringify(usuarioValido))
          this.router.navigate(['/home'])
        } else {
          this.mensajeLogin = 'Nombre o contraseña incorrectos ❌';
          console.log('Error: usuario no válido');
        }
      }

      }
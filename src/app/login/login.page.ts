import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
          this.mensajeLogin = 'Inicio de sesión exitoso ✅';
          console.log('Usuario válido');
        } else {
          this.mensajeLogin = 'Nombre o contraseña incorrectos ❌';
          console.log('Error: usuario no válido');
        }
      }

      }


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registrarUsuarios: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fauth: Auth
  ) {
    this.registrarUsuarios = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}
  registrar = () => {
    const name = this.registrarUsuarios.value.name;
    const email = this.registrarUsuarios.value.email;
    const password = this.registrarUsuarios.value.password;
    console.log('registrando', name, email, password);

    createUserWithEmailAndPassword(this.fauth, email, password)
      .then((userCredential: any) => {
        // Signed up
        const user = userCredential.user;
        this.verificarCorreo(userCredential.user);
        this.router.navigate(['/login-new']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al registrar usuario:', errorCode, errorMessage);
        // ..
      });
  };
  verificarCorreo = (currentUser: any) => {
    console.log('esperando envio');

    sendEmailVerification(currentUser).then(() => {
      console.log('ENVIO CORRECTO DE EMAIL...');
    });
  };
}

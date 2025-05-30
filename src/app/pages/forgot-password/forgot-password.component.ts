import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: false,
})
export class ForgotPasswordComponent implements OnInit {
  resetUsuario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fauth: Auth
  ) {
     this.resetUsuario = this.fb.group({
      email: ['',[Validators.required]],
    });
  }

  ngOnInit() {}

  recuperarClave = () =>{
    const email = this.resetUsuario.value.email;
    sendPasswordResetEmail(this.fauth, email)
  .then(() => {
    // Password reset email sent!
    console.log('Correo Enviado');
    this.router.navigate(['/login'])

    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
}

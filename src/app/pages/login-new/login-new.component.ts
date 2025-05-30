import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IonInput, IonContent } from '@ionic/angular/standalone';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.scss'],
  standalone: false,
},
)
export class LoginNewComponent implements OnInit {
  inciarUsuario: FormGroup;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
  ) {
     this.inciarUsuario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.inciarUsuario.reset();
    this.errorMessage = '';
  }
  logIn = () => {
    const user = this.inciarUsuario.value.email;
    const password = this.inciarUsuario.value.password;
    signInWithEmailAndPassword(this.auth, user, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.router.navigate(['/home']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/invalid-credential':
            this.errorMessage = 'Error en un campo...';
            break;

          default:
            this.errorMessage = error.message;
            break;
        }
      });
  };
}

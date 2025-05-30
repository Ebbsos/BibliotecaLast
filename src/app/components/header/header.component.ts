import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = 'Biblioteca';
  usuarioNombre: string | null = 'usuario';

  ngOnInit() {
    this.cargarUsuario();

  }
  constructor(private auth: Auth, private router: Router) {}

  cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('user');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuarioNombre = usuario.nombre;
    }
  }
  logOut = () => {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('salir');

        this.router.navigate(['/login-new']);
      })
      .catch((error) => {
        // An error happened.
        console.log('Algun error');
      });
  };
}

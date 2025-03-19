import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = 'Biblioteca';
  usuarioNombre: string | null = 'usuario';
  ngOnInit() {
    this.cargarUsuario();
  }
  constructor(private router: Router) { }
  cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuarioNombre = usuario.nombre
    }
  }
  logout() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent {
  @Input() titulo: string = 'Biblioteca';

  constructor(private router: Router) {}

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}

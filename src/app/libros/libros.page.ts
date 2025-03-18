import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: false,
})
export class LibrosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public libros : any []=[
    {nombre:'El principito', autor:'nose', edicion:'2025'},
    {nombre:'El alquimista', autor:'paulo', edicion:'2023'},
  ]
}

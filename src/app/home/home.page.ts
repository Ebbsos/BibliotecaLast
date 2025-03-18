import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  constructor() {}
  ngOnInit() {
  }


  public PrestamosActual : any[] = [
    {cliente:'Juan',libro:'El alquimista', fecha_prestada:'16-01-2025', fecha_devolucion:'20-03-2025'},
    {cliente:'Maria',libro:'El pricnipito', fecha_prestada:'13-06-2024', fecha_devolucion:'20-09-243'},
    {cliente:'Pedro',libro:'Libro1', fecha_prestada:'16-02-2025', fecha_devolucion:'20-05-2025'},
    {cliente:'Elias',libro:'Libro2', fecha_prestada:'16-03-2025', fecha_devolucion:'20-06-2025'}

  ];

}

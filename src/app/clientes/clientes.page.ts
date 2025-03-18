import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,
})
export class ClientesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public infoClientes : any[] =[
    {nombre:'Evelyn', apellido:'Sosa',cedula:'5126811',domicilio:'La Blanca', numero:'0983656086'},
     {nombre:'Elias', apellido:'Gonza',cedula:'1111',domicilio:'La avda', numero:'00'}
  ]

}

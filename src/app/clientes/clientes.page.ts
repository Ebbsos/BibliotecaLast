import { clientI } from '../shared/models/clientes';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firestoreservice';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,
})
export class ClientesPage implements OnInit {
  clients: clientI[] = [];
  newClient!: clientI;
  constructor(private FirestoreService: FirebaseService) {
    this.listarClientes();
    this.initClient();
  }

  ngOnInit() {}
  //Datos estaticos
  /*  public infoClientes: any[] = [
    {
      nombre: 'Evelyn',
      apellido: 'Sosa',
      cedula: '5126811',
      domicilio: 'La Blanca',
      numero: '0983656086',
    },
    {
      nombre: 'Elias',
      apellido: 'Gonza',
      cedula: '1111',
      domicilio: 'La avda',
      numero: '00',
    },
  ]; */

  listarClientes() {
    this.FirestoreService.getCollectionChanges<clientI>('clientes').subscribe(
      (data) => {
        if (data) {
          this.clients = data;
        }
      }
    );
  }
  initClient() {
    this.newClient = {
      nombre: '',
      apellido: '',
      direccion: '',
      numero: '',
      id: '',
    };
  }

  edit(cliente: clientI) {
    this.newClient = { ...cliente };
    console.log('editando el cliente', cliente);
  }
  async delete(cliente: clientI) {
    await this.FirestoreService.deleteDocumentID('clientes', cliente.id);
    console.log('Eliminando el cliente', cliente);
  }
  async save() {
    //si es un nuevo producto osea no tiene ID, le asignamos uno nuevo
    if (!this.newClient.id) {
      this.newClient.id = this.FirestoreService.createIdDoc();
      await this.FirestoreService.createDocumentID(
        this.newClient,
        'clientes',
        this.newClient.id
      );
    } else {
      await this.FirestoreService.updateDocument(
        this.newClient,
        'clientes',
        this.newClient.id
      );
    }

    this.initClient(); //limpiar despues de guardar
  }
}

import { Firestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { librosI } from '../shared/models/libros';
import { FirebaseService } from '../shared/services/firestoreservice';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: false,
})
export class LibrosPage implements OnInit {
  libros: librosI[] = [];
  newlibro!: librosI;
  constructor(private FirestoreService: FirebaseService) {
    this.listarLibros();
    this.initLibros();
  }

  ngOnInit() {}
  listarLibros() {
    // una vez que usamos la funion getCollectionChanges estamos recibiendo el observable que nos da los datos internamente,
    this.FirestoreService.getCollectionChanges<librosI>('libro').subscribe(
      (data) => {
        // con subscribe Cada vez que llegan datos nuevos (o se actualiza la colección), esta función se ejecuta.
        // data es el valor que el observable emite(los datos que tiene la collecion pero las tenemos internamente)
        if (data) {
          this.libros = data;
        }
        //Si recibo datos desde Firebase(si hay datos), los guardo en products para poder usarlos en la interfaz.
      }
    );
  }
  initLibros() {
    this.newlibro = {
      autor: '',
      edicion: '',
      estado: '',
      nombre: '',
      id: '',
    };
  }

  edit(libro: librosI) {
    this.newlibro = { ...libro };
    console.log('editando el libro', libro);
  }
  async delete(libro: librosI) {
    await this.FirestoreService.deleteDocumentID('libro', libro.id);
    console.log('Eliminando el libro', libro);
  }
  async save() {
    //si es un nuevo producto osea no tiene ID, le asignamos uno nuevo
    if (!this.newlibro.id) {
      this.newlibro.id = this.FirestoreService.createIdDoc();
    } else {
      await this.FirestoreService.updateDocument(
        this.newlibro,
        'libro',
        this.newlibro.id
      );
    }

    this.initLibros(); //limpiar despues de guardar
  }
}

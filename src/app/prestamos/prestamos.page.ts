import { prestamosI } from './../shared/models/prestamos';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firestoreservice';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
  standalone: false,
})
export class PrestamosPage implements OnInit {
  prestams: prestamosI[] = [];
  newPrestamo!: prestamosI;
  constructor(private FirestoreService: FirebaseService) {
    this.listarPrestamos();
    this.initPrestamo();
  }

  ngOnInit() {}
  listarPrestamos() {
    this.FirestoreService.getCollectionChanges<prestamosI>(
      'prestamos'
    ).subscribe((data) => {
      if (data) {
        this.prestams = data;
      }
    });
  }
  initPrestamo() {
    const hoy = new Date();
    const en30dias = new Date();
    en30dias.setDate(hoy.getDate() + 30);

    this.newPrestamo = {
      cliente: '',
      libro: '',
      fechaPrestamo: hoy,
      fechaVuelta: en30dias,
      id: '',
    };
  }

  edit(prestamo: prestamosI) {
    this.newPrestamo = { ...prestamo };
    console.log('editando el cliente', prestamo);
  }
  async delete(prestamo: prestamosI) {
    await this.FirestoreService.deleteDocumentID('prestamos', prestamo.id);
    console.log('Eliminando el cliente', prestamo);
  }
  async save() {
    //si es un nuevo producto osea no tiene ID, le asignamos uno nuevo
    if (!this.newPrestamo.id) {
      this.newPrestamo.id = this.FirestoreService.createIdDoc();
    }
    await this.FirestoreService.createDocumentID(
      this.newPrestamo,
      'prestamos',
      this.newPrestamo.id
    );
    this.initPrestamo(); //limpiar despues de guardar
  }

  mostrarSelectorPrestamo = false;
  mostrarSelectorVuelta = false;

  abrirSelector(tipo: 'prestamo' | 'vuelta') {
    if (tipo === 'prestamo') {
      this.mostrarSelectorPrestamo = true;
    } else {
      this.mostrarSelectorVuelta = true;
    }
  }

  cerrarSelector(tipo: 'prestamo' | 'vuelta') {
    if (tipo === 'prestamo') {
      this.mostrarSelectorPrestamo = false;
    } else {
      this.mostrarSelectorVuelta = false;
    }
  }

  seleccionarFecha(event: any, tipo: 'prestamo' | 'vuelta') {
    const fecha = new Date(event.detail.value);
    if (tipo === 'prestamo') {
      this.newPrestamo.fechaPrestamo = fecha;
      this.mostrarSelectorPrestamo = false;
    } else {
      this.newPrestamo.fechaVuelta = fecha;
      this.mostrarSelectorVuelta = false;
    }
  }

  formatFecha(fecha: Date | string | Timestamp): string {
    const f = fecha instanceof Timestamp ? fecha.toDate() : new Date(fecha);
    return f.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}

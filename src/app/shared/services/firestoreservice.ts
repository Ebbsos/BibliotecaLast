import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

getCollectionChanges<tipo>(path: string) {
  const item = collection(this.firestore, path);
  return collectionData(item, { idField: 'id' }) as Observable<tipo[]>; // ✅ Incluye el ID
}

  deleteDocumentID(enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  createDocumentID(data: any, enlace: string, idDoc: string) {
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }

  createIdDoc() {
    return uuidv4();
  }

  updateDocument(data: any, enlace: string, idDoc: string) {
  const document = doc(this.firestore, `${enlace}/${idDoc}`);
  return setDoc(document, data, { merge: true }); // ✅ solo actualiza los campos dados
}
}

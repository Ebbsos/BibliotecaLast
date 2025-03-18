import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component'; // 📌 Importamos el header

@NgModule({
  declarations: [HeaderComponent], // ✅ Declaramos los componentes reutilizables
  imports: [
    CommonModule, // ✅ Necesario para directivas como *ngIf y *ngFor
    IonicModule // ✅ Permite usar componentes de Ionic
  ],
  exports: [HeaderComponent] // ✅ Exportamos los componentes para usarlos en otros módulos
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component'; // 📌 Importamos el header
import { RegisterComponent } from '../pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginNewComponent } from '../pages/login-new/login-new.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    HeaderComponent,
    RegisterComponent,
    LoginNewComponent,
    ForgotPasswordComponent,
  ], // Declaramos los componentes reutilizables
  imports: [
    CommonModule, //  Necesario para directivas como *ngIf y *ngFor
    IonicModule, // Permite usar componentes de Ionic
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent], // Exportamos los componentes para usarlos en otros módulos
})
export class SharedModule {}

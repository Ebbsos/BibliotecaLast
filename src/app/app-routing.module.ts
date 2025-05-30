import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginNewComponent } from './pages/login-new/login-new.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
/*  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }, */
   {
    path: 'login-new',
    canActivate: [noAuthGuard],
    component:LoginNewComponent
  },
    {
    path: 'register',
    canActivate: [noAuthGuard],
    component: RegisterComponent
  },
    {
    path: 'forgot-password',
     canActivate: [noAuthGuard],
    component: ForgotPasswordComponent

  },
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesPageModule),
  },
  {
    path: 'libros',
    canActivate: [authGuard],
    loadChildren: () => import('./libros/libros.module').then(m => m.LibrosPageModule),

  },
  {
    path: 'prestamos',
     canActivate: [authGuard],
    loadChildren: () => import('./prestamos/prestamos.module').then( m => m.PrestamosPageModule)
  },
    {
    path: '**',
    redirectTo: 'login-new'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

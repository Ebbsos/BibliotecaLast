import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return new Promise<boolean>((resolve) => {
   const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      unsubscribe();
      if (user) {
        resolve(true); // ✅ Usuario logueado
      } else {
        router.navigate(['/login-new']); //  Redirigir si no hay sesión
        resolve(false);
      }
    });
  });
};

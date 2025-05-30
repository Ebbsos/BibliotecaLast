// src/app/shared/guards/no-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.navigate(['/home']); // Ya está logueado → redirigir
        resolve(false);
      } else {
        resolve(true); // Puede ver login
      }
    });
  });
};

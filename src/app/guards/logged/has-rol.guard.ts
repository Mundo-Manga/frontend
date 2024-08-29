import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VerifyService } from '../../services/routeProtectedVerify/verify.service';

export const hasRoleGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const router: Router = inject(Router);
  const verifyService = inject(VerifyService);

  return verifyService.verifyLogged().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    }),
    catchError((error) => {
      console.error('Error during guard verification:', error);
      return of(router.createUrlTree(['/']));
    })
  );
};

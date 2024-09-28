import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = authService.getToken();
  const HTTP_Responses = {
    Unauthorized: 401
  };

  const headers = {
    'Content-Type': 'application/json',
    ...(token && {'Authorization': `Bearer ${token}`})
  };

  const modifiedRequest = req.clone({
    setHeaders: headers
  });

  return next(modifiedRequest).pipe(
    catchError(error => {
      if (error.status === HTTP_Responses.Unauthorized) {
        authService.logout();
        toastr.error(error.error.error_description[0] || 'Houve um problema');
        router.navigate(['/login']);
      } else {
        toastr.error(error.error.error_description[0] || 'Houve um problema');
      }
      return throwError(error);
    })
  );
};

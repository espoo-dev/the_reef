import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && {'Authorization': `Bearer ${token}`})
  };

  const modifiedRequest = req.clone({
    setHeaders: headers
  });
  return next(modifiedRequest);
};

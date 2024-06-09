import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const modifiedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    }
  });
  return next(modifiedRequest);
};

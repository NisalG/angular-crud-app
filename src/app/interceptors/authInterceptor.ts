import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let authToken = null;
  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('token');
  }

  if (authToken) {
    // Clone the request and set the new header in one step
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    // Send cloned request with header to the next handler
    return next(authReq);
  } else {
    // Pass through the request if no token is found
    return next(req);
  }
}

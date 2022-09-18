import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { CoreService } from '@services/core';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private coreService: CoreService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.coreService.showLoad();

    return next.handle(request).pipe(
      map((request) => {
        this.coreService.hideLoad();
        return request;
      }),
      catchError((error) => {
        // Cuando la aplicación o una ruta está en mantenimiento
        if (error.status === 503) {
          this.authService.removeLogin();
          this.router.navigate(['/common/under-maintenance']);
        }

        // Cuando el usuario no tiene permisos para acceder al recurso solicitado y no está logueado
        if (
          (error.status === 401 ||
            error.status === 403 ||
            error.status === 423) &&
          !this.authService.token
        ) {
          this.authService.removeLogin();
          this.router.navigate(['/auth/login']);
        }

        this.coreService.hideLoad();
        return throwError(error);
      })
    );
  }
}

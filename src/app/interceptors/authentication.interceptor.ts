import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { RoutesService } from '@services/core';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routesService: RoutesService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // Cuando la aplicación o una ruta está en mantenimiento
        if (error.status === 503) {
          this.authService.removeLogin();
          this.router.navigate(['/common/under-maintenance']);
        }

        // Cuando el usuario está suspendido
        if (error.status === 429) {
          this.authService.removeLogin();
          this.router.navigate(['/auth/login']);
        }
        if (error.status === 401) {
          this.authService.removeLogin();
          this.routesService.login();
        }
        // Cuando el usuario no tiene permisos para acceder al recurso solicitado y se encuentra logueado
        if (
          (error.status === 401 ||
            error.status === 403 ||
            error.status === 423) &&
          this.authService.token
        ) {
          // this.authService.removeLogin();
          // this.router.navigate(['/auth/login']);
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

        return throwError(error);
      })
    );
  }
}

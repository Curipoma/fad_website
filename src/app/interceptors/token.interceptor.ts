import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { AuthService } from '@services/auth';
import { CoreService } from '@services/core';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private coreService: CoreService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.coreService.showLoad();

    let headers = request.headers ? request.headers : new HttpHeaders();

    if (this.authService.token) {
      headers = headers.append(
        'Authorization',
        `Bearer ${this.authService.token.replace(/"/g, '')}`
      );
    }

    return next.handle(request.clone({ headers })).pipe(
      map((request) => {
        this.coreService.hideLoad();
        return request;
      }),
      catchError((error) => {
        this.coreService.hideLoad();
        return throwError(error);
      })
    );
  }
}

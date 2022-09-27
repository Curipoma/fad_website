import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreService, MessageCustomizationService } from '@services/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private coreService: CoreService,
    private messageCustomizationService: MessageCustomizationService,
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
        this.messageCustomizationService.error(error);
        this.router.navigate(['common/not-found/']);
        this.coreService.hideLoad();
        return throwError(error);
      })
    );
  }
}

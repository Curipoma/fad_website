import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreService, MessageService } from '@services/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private coreService: CoreService,
    private router: Router,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.coreService.showLoad();
    return next.handle(request).pipe(
      catchError((error) => {
        this.messageService.error(error);
        this.router.navigate(['common/not-found/']);
        this.coreService.hideLoad();
        return throwError(error);
      })
    );
  }
}

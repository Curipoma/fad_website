import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreService } from '@services/core';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  constructor(private coreService: CoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let flag;
    let headers = request.headers ? request.headers : new HttpHeaders();
    let params = request.params ? request.params : new HttpParams();

    if (headers.get('pagination')) {
      if (!params.get('perPage')) {
        params = params.append('perPage', this.coreService.paginator.perPage);
        params = params.append('page', this.coreService.paginator.page);
      }
    }

    flag = request.headers
      .getAll('Content-Type')
      ?.some((header) => header === 'multipart/form-data');
    headers = headers.append('Accept', 'application/json');

    if (!flag) {
      headers = headers.append('Content-Type', 'application/json');
    }

    return next.handle(request.clone({ headers, params }));
  }
}

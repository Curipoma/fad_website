import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MessageCustomizationService, CoreService } from '@services/core';
import { ServerResponse } from '@models/http';
import { PaginatorModel } from '@models/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractHttpService {
  private pagination = new BehaviorSubject<PaginatorModel>(
    this.coreService.paginator
  );
  public pagination$ = this.pagination.asObservable();

  protected constructor(
    @Inject('coreService') private coreService: CoreService,
    @Inject('httpClient') protected httpClient: HttpClient,
    @Inject('messageService')
    private messageService: MessageCustomizationService,
    @Inject('resourceUrl') private resourceUrl: string
  ) {}

  index<T>(page: number = 0, search: string = ''): Observable<T> {
    const headers = new HttpHeaders().append('pagination', 'true');
    const params = new HttpParams()
      .append('page', page)
      .append('search', search);
    this.coreService.showLoad();
    return this.httpClient
      .get<ServerResponse<T>>(this.resourceUrl, { headers, params })
      .pipe(
        map((res) => {
          if (res.pagination) {
            this.pagination.next(res.pagination);
          }
          this.coreService.hideLoad();
          return res.data;
        })
      );
  }

  store<T, B>(body: B): Observable<T> {
    this.coreService.showLoad();
    return this.httpClient.post<ServerResponse<T>>(this.resourceUrl, body).pipe(
      map((res) => {
        this.messageService.success(res);
        this.coreService.hideLoad();
        return res.data;
      })
    );
  }

  show<T>(id: number): Observable<T> {
    this.coreService.showLoad();
    return this.httpClient
      .get<ServerResponse<T>>(this.resourceUrl.concat(`/${id.toString()}`))
      .pipe(
        map((res) => {
          this.coreService.hideLoad();
          return res.data;
        })
      );
  }

  update<T, B>(id: number, body: B): Observable<T> {
    this.coreService.showLoad();
    return this.httpClient
      .put<ServerResponse<T>>(
        this.resourceUrl.concat(`/${id.toString()}`),
        body
      )
      .pipe(
        map((res) => {
          this.messageService.success(res);
          this.coreService.hideLoad();
          return res.data;
        })
      );
  }

  delete<T>(id: number): Observable<T> {
    this.coreService.showLoad();
    return this.httpClient
      .delete<ServerResponse<T>>(this.resourceUrl.concat(`/${id.toString()}`))
      .pipe(
        map((res) => {
          this.messageService.success(res);
          this.coreService.hideLoad();
          return res.data;
        })
      );
  }
}

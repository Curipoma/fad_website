import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MessageService, CoreService } from '@services/core';
import { ServerResponse } from '@models/http';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractHttpService {
  protected constructor(
    @Inject('coreService') private coreService: CoreService,
    @Inject('httpClient') protected httpClient: HttpClient,
    @Inject('messageService') private messageService: MessageService,
    @Inject('resourceUrl') private resourceUrl: string
  ) {}

  index<T>(): Observable<T> {
    const headers = new HttpHeaders().append('pagination', 'true');
    this.coreService.showLoad();
    return this.httpClient
      .get<ServerResponse<T>>(this.resourceUrl, { headers })
      .pipe(
        map((res) => {
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

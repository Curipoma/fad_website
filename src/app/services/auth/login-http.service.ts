import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CoreService } from '@services/core/core.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractHttpService,
  MessageCustomizationService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import {map, Observable} from "rxjs";
import {ServerResponse} from "@models/http";

@Injectable({
  providedIn: 'root',
})
export class LoginHttpService  {
  private url = environment.API_URL.concat('users/login');

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private messageService: MessageCustomizationService,
    private messagesService: MessagesService
  ) {

  }
  login<T, B>(body: B): Observable<T> {
    this.coreService.showLoad();
    return this.httpClient.post<ServerResponse<T>>(this.url, body).pipe(
      map((res) => {
        this.messageService.success(res);
        this.coreService.hideLoad();
        this.messagesService.showSuccess(
          'Satisfactorio',
          'Datos ingresados correctamente'
        );
        return res.data;
      })
    );
  }
}

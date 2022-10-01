import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CoreService } from '@services/core/core.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractHttpService,
  MessageCustomizationService,
} from '@services/core';
import { MessagesService } from '@services/shared';

@Injectable({
  providedIn: 'root',
})
export class ConsumablesHttpService extends AbstractHttpService {
  static url = environment.API_URL.concat('consumables');

  constructor(
    coreService: CoreService,
    httpClient: HttpClient,
    messageService: MessageCustomizationService,
    messagesService: MessagesService
  ) {
    super(
      coreService,
      httpClient,
      messageService,
      ConsumablesHttpService.url,
      messagesService
    );
  }
}

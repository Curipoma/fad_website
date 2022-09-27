import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CoreService } from '@services/core/core.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractHttpService,
  MessageCustomizationService,
} from '@services/core';

@Injectable({
  providedIn: 'root',
})
export class AssetDetailsHttpService extends AbstractHttpService {
  static url = environment.API_URL.concat('asset-details');

  constructor(
    coreService: CoreService,
    httpClient: HttpClient,
    messageService: MessageCustomizationService
  ) {
    super(coreService, httpClient, messageService, AssetDetailsHttpService.url);
  }
}

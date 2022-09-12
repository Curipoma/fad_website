import { Inject, Injectable } from '@angular/core';
import {
  AbstractHttpService,
  CoreService,
  MessageService,
} from '@services/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsHttpService extends AbstractHttpService {
  static url = environment.API_URL.concat('projects');

  constructor(
    coreService: CoreService,
    httpClient: HttpClient,
    messageService: MessageService
  ) {
    super(coreService, httpClient, messageService, ProjectsHttpService.url);
  }
}

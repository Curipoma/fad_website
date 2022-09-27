import { Component } from '@angular/core';
import { MessagesService } from '@services/shared';
import { CoreRoutes, EnvRoutes } from '@shared/enums';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  confirm: Function = this.messagesService.onConfirm;
  reject: Function = this.messagesService.onReject;

  constructor(private messagesService: MessagesService) {}

  onConfirm() {
    this.confirm();
  }
  onReject() {
    this.reject();
  }
}

import { Component } from '@angular/core';
import { MessagesService } from '@services/shared';
import { MessageKeysEnum } from '@shared/enums';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(private messagesService: MessagesService) {}

  onConfirm() {
    this.messagesService.confirm();
    this.messagesService.clearAll(MessageKeysEnum.QUESTION_ACTION);
  }
  onReject() {
    this.messagesService.reject();
    this.messagesService.clearAll(MessageKeysEnum.QUESTION_ACTION);
  }
}

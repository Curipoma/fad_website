import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageTypeEnum } from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public confirm: Function = () => {};
  public reject: Function = () => {};

  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string): void {
    this.messageService.add({
      severity: MessageTypeEnum.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  questionAction(
    summary: string = '',
    detail: string = '',
    key: string = '',
    onConfirm: Function = () => {},
    onReject: Function = () => {}
  ): void {
    this.confirm = onConfirm;
    this.reject = onReject;
    this.messageService.add({
      key: key,
      severity: MessageTypeEnum.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageTypeEnum.INFO,
      summary: summary,
      detail: detail,
    });
  }

  showWarn(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageTypeEnum.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageTypeEnum.ERROR,
      summary: summary,
      detail: detail,
    });
  }

  showCustom(summary: string, detail: string, icon: string) {
    this.messageService.add({
      severity: MessageTypeEnum.CUSTOM,
      summary: summary,
      detail: detail,
      icon: icon,
    });
  }

  showTopLeft(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageTypeEnum.INFO,
      summary: summary,
      detail: detail,
    });
  }

  showTopCenter(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageTypeEnum.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showBottomCenter(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageTypeEnum.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  showConfirm(summary: string, detail: string, key: string = 'abc') {
    this.messageService.clear();
    this.messageService.add({
      key: key,
      sticky: true,
      severity: MessageTypeEnum.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  showMultiple(messages: []) {
    this.messageService.addAll(messages);
  }

  showSticky(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageTypeEnum.INFO,
      summary: summary,
      detail: detail,
      sticky: true,
    });
  }

  clearAll(key: string = '') {
    this.messageService.clear(key);
  }
}

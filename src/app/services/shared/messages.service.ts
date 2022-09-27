import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageType } from '@shared/enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  onConfirm: Function = () => {
    console.log('other funtion')};
  onReject: Function = () => {};

  constructor(private messageService: MessageService, private router: Router) {}

  showSuccess(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageType.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  questionAction(
    summary: string,
    detail: string,
    key: string,
    onConfirm: Function,
    onReject: Function
  ) {
    console.log(onConfirm)


    this.onConfirm = onConfirm;
    this.onReject = onReject;

    console.log(this.onConfirm())

    this.messageService.add({
      key: key,
      severity: MessageType.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageType.INFO,
      summary: summary,
      detail: detail,
    });
  }

  showWarn(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageType.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageType.ERROR,
      summary: summary,
      detail: detail,
    });
  }

  showCustom(summary: string, detail: string, icon: string) {
    this.messageService.add({
      severity: MessageType.CUSTOM,
      summary: summary,
      detail: detail,
      icon: icon,
    });
  }

  showTopLeft(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageType.INFO,
      summary: summary,
      detail: detail,
    });
  }

  showTopCenter(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageType.WARN,
      summary: summary,
      detail: detail,
    });
  }

  showBottomCenter(summary: string, detail: string, key: string = 'abc') {
    this.messageService.add({
      key: key,
      severity: MessageType.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  showConfirm(summary: string, detail: string, key: string = 'abc') {
    this.messageService.clear();
    this.messageService.add({
      key: key,
      sticky: true,
      severity: MessageType.SUCCESS,
      summary: summary,
      detail: detail,
    });
  }

  showMultiple(messages: []) {
    this.messageService.addAll(messages);
  }

  showSticky(summary: string, detail: string) {
    this.messageService.add({
      severity: MessageType.INFO,
      summary: summary,
      detail: detail,
      sticky: true,
    });
  }

  clearAll(key: string = '') {
    this.messageService.clear(key);
  }
}

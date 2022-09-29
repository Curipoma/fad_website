import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [LoadingComponent, MessagesComponent, ProgressBarComponent],
  exports: [LoadingComponent, MessagesComponent, ProgressBarComponent],
  imports: [CommonModule, ToastModule, ButtonModule],
})
export class SharedModule {}

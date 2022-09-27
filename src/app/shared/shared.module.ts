import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [LoadingComponent, MessagesComponent],
  exports: [LoadingComponent, MessagesComponent],
    imports: [CommonModule, ToastModule, ButtonModule],
})
export class SharedModule {}

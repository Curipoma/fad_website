import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';

import { RolesPermissionsDirective } from '@shared/directives/roles-permissions.directive';
import { ErrorMessageDirective } from '@shared/directives/error-message.directive';
import { TokenDirective } from '@shared/directives/token.directive';
import { LabelDirective } from './directives/label.directive';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    LoadingComponent,
    MessagesComponent,
    ProgressBarComponent,
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
  ],
  exports: [
    LoadingComponent,
    MessagesComponent,
    ProgressBarComponent,
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
  ],
  imports: [CommonModule, ToastModule, ButtonModule, ProgressBarModule],
})
export class SharedModule {}

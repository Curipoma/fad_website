import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UsersFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    TranslateModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    CardModule,
    SharedModule,
    ProgressBarModule,
  ],
})
export class UsersModule {}

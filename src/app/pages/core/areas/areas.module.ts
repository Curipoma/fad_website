import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { AreasFormComponent } from './areas-form/areas-form.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from "primeng/card";
import { SharedModule } from '@shared/shared.module';
import {MultiSelectModule} from "primeng/multiselect";

@NgModule({
  declarations: [AreasComponent, AreasFormComponent, AreasListComponent],
  imports: [
    CommonModule,
    AreasRoutingModule,
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
    MultiSelectModule,
  ],
})
export class AreasModule {}

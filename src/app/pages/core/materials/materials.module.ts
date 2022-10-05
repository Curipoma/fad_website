import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsFormComponent } from './materials-form/materials-form.component';
import { MaterialsComponent } from './materials.component';
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
  declarations: [
    MaterialsComponent,
    MaterialsFormComponent,
    MaterialsListComponent,
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
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
export class MaterialsModule {}

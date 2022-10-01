import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageInformationComponent } from './page-information/page-information.component';
import { TranslateModule } from '@ngx-translate/core';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NotFoundComponent,
    PageInformationComponent,
    UnderMaintenanceComponent,
  ],
  imports: [
    NgCommonModule,
    CommonRoutingModule,
    SharedModule,
    TranslateModule,
    ButtonModule,
  ],
})
export class CommonModule {}

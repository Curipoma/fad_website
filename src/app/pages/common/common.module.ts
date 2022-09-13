import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageInformationComponent } from './page-information/page-information.component';

@NgModule({
  declarations: [NotFoundComponent, PageInformationComponent],
  imports: [NgCommonModule, CommonRoutingModule, SharedModule],
})
export class CommonModule {}

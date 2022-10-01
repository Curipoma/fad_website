import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetDetailsRoutingModule } from './asset-details-routing.module';
import { AssetDetailsListComponent } from './asset-details-list/asset-details-list.component';
import { AssetDetailsFormComponent } from './asset-details-form/asset-details-form.component';
import { AssetDetailsComponent } from './asset-details.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@shared/shared.module';
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
  declarations: [
    AssetDetailsListComponent,
    AssetDetailsFormComponent,
    AssetDetailsComponent,
  ],
    imports: [
        CommonModule,
        AssetDetailsRoutingModule,
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
export class AssetDetailsModule {}

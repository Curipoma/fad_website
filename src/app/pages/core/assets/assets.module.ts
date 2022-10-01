import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsFormComponent } from './assets-form/assets-form.component';
import { AssetsComponent } from './assets.component';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '@shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
  declarations: [AssetsListComponent, AssetsFormComponent, AssetsComponent],
    imports: [
        CommonModule,
        AssetsRoutingModule,
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
export class AssetsModule {}

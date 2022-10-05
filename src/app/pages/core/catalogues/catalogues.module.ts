import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CataloguesRoutingModule } from './catalogues-routing.module';
import { CataloguesListComponent } from './catalogues-list/catalogues-list.component';
import { CataloguesFormComponent } from './catalogues-form/catalogues-form.component';
import { CataloguesComponent } from './catalogues.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PaginatorModule} from "primeng/paginator";
import {TranslateModule} from "@ngx-translate/core";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {SharedModule} from "@shared/shared.module";
import {ProgressBarModule} from "primeng/progressbar";


@NgModule({
  declarations: [
    CataloguesListComponent,
    CataloguesFormComponent,
    CataloguesComponent
  ],
  imports: [
    CommonModule,
    CataloguesRoutingModule,
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
  ]
})
export class CataloguesModule { }

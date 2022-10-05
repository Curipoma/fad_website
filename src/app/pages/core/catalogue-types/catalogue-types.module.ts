import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueTypesRoutingModule } from './catalogue-types-routing.module';
import { CatalogueTypesListComponent } from './catalogue-types-list/catalogue-types-list.component';
import { CatalogueTypesFormComponent } from './catalogue-types-form/catalogue-types-form.component';
import { CatalogueTypesComponent } from './catalogue-types.component';
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
    CatalogueTypesListComponent,
    CatalogueTypesFormComponent,
    CatalogueTypesComponent
  ],
  imports: [
    CommonModule,
    CatalogueTypesRoutingModule,
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
export class CatalogueTypesModule { }

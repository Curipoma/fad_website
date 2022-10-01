import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumablesRoutingModule } from './consumables-routing.module';
import { ConsumablesListComponent } from './consumables-list/consumables-list.component';
import { ConsumablesFormComponent } from './consumables-form/consumables-form.component';
import { ConsumablesComponent } from './consumables.component';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "@shared/shared.module";
import {ProgressBarModule} from "primeng/progressbar";


@NgModule({
  declarations: [
    ConsumablesListComponent,
    ConsumablesFormComponent,
    ConsumablesComponent
  ],
    imports: [
        CommonModule,
        ConsumablesRoutingModule,
        TableModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        PaginatorModule,
        SharedModule,
        ProgressBarModule
    ]
})
export class ConsumablesModule { }

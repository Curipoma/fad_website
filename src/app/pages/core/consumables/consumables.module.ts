import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumablesRoutingModule } from './consumables-routing.module';
import { ConsumablesListComponent } from './consumables-list/consumables-list.component';
import { ConsumablesFormComponent } from './consumables-form/consumables-form.component';
import { ConsumablesComponent } from './consumables.component';


@NgModule({
  declarations: [
    ConsumablesListComponent,
    ConsumablesFormComponent,
    ConsumablesComponent
  ],
  imports: [
    CommonModule,
    ConsumablesRoutingModule
  ]
})
export class ConsumablesModule { }

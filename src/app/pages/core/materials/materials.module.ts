import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsFormComponent } from './materials-form/materials-form.component';
import { MaterialsComponent } from './materials.component';


@NgModule({
  declarations: [
    MaterialsListComponent,
    MaterialsFormComponent,
    MaterialsComponent
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule
  ]
})
export class MaterialsModule { }

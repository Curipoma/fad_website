import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueTypesRoutingModule } from './catalogue-types-routing.module';
import { CatalogueTypesListComponent } from './catalogue-types-list/catalogue-types-list.component';
import { CatalogueTypesFormComponent } from './catalogue-types-form/catalogue-types-form.component';
import { CatalogueTypesComponent } from './catalogue-types.component';


@NgModule({
  declarations: [
    CatalogueTypesListComponent,
    CatalogueTypesFormComponent,
    CatalogueTypesComponent
  ],
  imports: [
    CommonModule,
    CatalogueTypesRoutingModule
  ]
})
export class CatalogueTypesModule { }

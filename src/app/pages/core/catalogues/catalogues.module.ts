import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CataloguesRoutingModule } from './catalogues-routing.module';
import { CataloguesListComponent } from './catalogues-list/catalogues-list.component';
import { CataloguesFormComponent } from './catalogues-form/catalogues-form.component';
import { CataloguesComponent } from './catalogues.component';


@NgModule({
  declarations: [
    CataloguesListComponent,
    CataloguesFormComponent,
    CataloguesComponent
  ],
  imports: [
    CommonModule,
    CataloguesRoutingModule
  ]
})
export class CataloguesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsFormComponent } from './assets-form/assets-form.component';
import { AssetsComponent } from './assets.component';


@NgModule({
  declarations: [
    AssetsListComponent,
    AssetsFormComponent,
    AssetsComponent
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule
  ]
})
export class AssetsModule { }

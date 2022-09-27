import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueTypesListComponent } from './catalogue-types-list/catalogue-types-list.component';
import { CatalogueTypesFormComponent } from './catalogue-types-form/catalogue-types-form.component';
import { CatalogueTypesComponent } from './catalogue-types.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueTypesComponent,
    children: [
      {
        path: '',
        component: CatalogueTypesListComponent,
      },
      {
        path: ':id',
        component: CatalogueTypesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueTypesRoutingModule {}

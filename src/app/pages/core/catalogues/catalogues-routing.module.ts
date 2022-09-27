import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguesListComponent } from './catalogues-list/catalogues-list.component';
import { CataloguesFormComponent } from './catalogues-form/catalogues-form.component';
import { CataloguesComponent } from './catalogues.component';

const routes: Routes = [
  {
    path: '',
    component: CataloguesComponent,
    children: [
      {
        path: '',
        component: CataloguesListComponent,
      },
      {
        path: ':id',
        component: CataloguesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CataloguesRoutingModule {}

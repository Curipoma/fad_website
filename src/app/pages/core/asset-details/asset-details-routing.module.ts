import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsListComponent } from './asset-details-list/asset-details-list.component';
import { AssetDetailsFormComponent } from './asset-details-form/asset-details-form.component';
import { AssetDetailsComponent } from './asset-details.component';

const routes: Routes = [
  {
    path: '',
    component: AssetDetailsComponent,
    children: [
      {
        path: '',
        component: AssetDetailsListComponent,
      },
      {
        path: ':id',
        component: AssetDetailsFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDetailsRoutingModule {}

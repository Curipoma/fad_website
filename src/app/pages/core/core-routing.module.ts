import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'asset-details',
    loadChildren: () =>
      import('./asset-details/asset-details.module').then(
        (m) => m.AssetDetailsModule
      ),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./assets/assets.module').then((m) => m.AssetsModule),
  },
  {
    path: 'catalogue-types',
    loadChildren: () =>
      import('./catalogue-types/catalogue-types.module').then(
        (m) => m.CatalogueTypesModule
      ),
  },
  {
    path: 'catalogues',
    loadChildren: () =>
      import('./catalogues/catalogues.module').then((m) => m.CataloguesModule),
  },
  {
    path: 'consumables',
    loadChildren: () =>
      import('./consumables/consumables.module').then(
        (m) => m.ConsumablesModule
      ),
  },
  {
    path: 'materials',
    loadChildren: () =>
      import('./materials/materials.module').then((m) => m.MaterialsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

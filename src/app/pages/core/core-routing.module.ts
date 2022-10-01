import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonRoutes, CoreRoutes } from '@shared/enums';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: CommonRoutes.DASHBOARD,
    component: DashboardComponent,
  },
  {
    path: CoreRoutes.ASSET_DETAILS,
    loadChildren: () =>
      import('./asset-details/asset-details.module').then(
        (m) => m.AssetDetailsModule
      ),
  },
  {
    path: CoreRoutes.ASSETS,
    loadChildren: () =>
      import('./assets/assets.module').then((m) => m.AssetsModule),
  },
  {
    path: CoreRoutes.CATALOGUE_TYPES,
    loadChildren: () =>
      import('./catalogue-types/catalogue-types.module').then(
        (m) => m.CatalogueTypesModule
      ),
  },
  {
    path: CoreRoutes.CATALOGUES,
    loadChildren: () =>
      import('./catalogues/catalogues.module').then((m) => m.CataloguesModule),
  },
  {
    path: CoreRoutes.CONSUMABLES,
    loadChildren: () =>
      import('./consumables/consumables.module').then(
        (m) => m.ConsumablesModule
      ),
  },
  {
    path: CoreRoutes.MATERIALS,
    loadChildren: () =>
      import('./materials/materials.module').then((m) => m.MaterialsModule),
  },
  {
    path: CoreRoutes.USERS,
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

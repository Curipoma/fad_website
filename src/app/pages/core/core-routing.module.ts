import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutes } from '@shared/enums';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: CoreRoutes.AREAS_LIST,
    loadChildren: () =>
      import('./areas/areas.module').then((m) => m.AreasModule),
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
    path: CoreRoutes.DASHBOARD,
    component: DashboardComponent,
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

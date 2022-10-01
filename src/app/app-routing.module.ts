import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent, BlankComponent } from '@layout';
import { CommonRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'core',
        loadChildren: () =>
          import('./pages/core/core.module').then((m) => m.CoreModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'common',
    component: BlankComponent,
    loadChildren: () =>
      import('./pages/common/common.module').then((m) => m.CommonModule),
  },
  {
    path: '**',
    redirectTo: CommonRoutes.NOT_FOUND,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

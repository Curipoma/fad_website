import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { BlankComponent } from './layout/blank/blank.component';

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
    redirectTo: '/common/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
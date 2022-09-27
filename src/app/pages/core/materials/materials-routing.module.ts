import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsFormComponent } from './materials-form/materials-form.component';
import { MaterialsComponent } from './materials.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialsComponent,
    children: [
      {
        path: '',
        component: MaterialsListComponent,
      },
      {
        path: ':id',
        component: MaterialsFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsRoutingModule {}

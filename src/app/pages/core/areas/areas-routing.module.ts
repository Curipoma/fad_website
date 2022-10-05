import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './areas.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AreasFormComponent } from './areas-form/areas-form.component';

const routes: Routes = [
  {
    path: '',
    component: AreasComponent,
    children: [
      {
        path: '',
        component: AreasListComponent,
      },
      {
        path: ':id',
        component: AreasFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}

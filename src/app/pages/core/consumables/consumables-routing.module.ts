import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumablesListComponent } from './consumables-list/consumables-list.component';
import { ConsumablesFormComponent } from './consumables-form/consumables-form.component';
import { ConsumablesComponent } from './consumables.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumablesComponent,
    children: [
      {
        path: '',
        component: ConsumablesListComponent,
      },
      {
        path: ':id',
        component: ConsumablesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumablesRoutingModule {}

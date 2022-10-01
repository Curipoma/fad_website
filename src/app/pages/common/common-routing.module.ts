import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageInformationComponent } from './page-information/page-information.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { CommonRoutes } from '@shared/enums';

const routes: Routes = [
  {
    path: CommonRoutes.UNDER_MAINTENANCE,
    component: UnderMaintenanceComponent,
  },
  { path: CommonRoutes.NOT_FOUND, component: NotFoundComponent },
  { path: CommonRoutes.PAGE, component: PageInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageInformationComponent } from './page-information/page-information.component';
import {UnderMaintenanceComponent} from "./under-maintenance/under-maintenance.component";

const routes: Routes = [
  { path: 'under-maintenance', component: UnderMaintenanceComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'page', component: PageInformationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}

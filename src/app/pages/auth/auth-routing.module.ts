import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutes } from '@shared/enums';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: AuthRoutes.ACCOUNT,
    component: AccountComponent,
  },
  {
    path: AuthRoutes.LOGIN,
    component: LoginComponent,
  },
  {
    path: AuthRoutes.REGISTER,
    component: RegisterComponent,
  },
  {
    path: AuthRoutes.SETTINGS,
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

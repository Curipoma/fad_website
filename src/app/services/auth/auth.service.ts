import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PermissionModel, RoleModel, UserModel } from '@models/auth';
import { environment } from '@env/environment';
import { CoreRoutes, EnvRoutes } from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private login = new BehaviorSubject<boolean>(this.isLoggedIn);
  public login$ = this.login.asObservable();
  static url = environment.API_URL.concat('user');

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return Boolean(localStorage.getItem('isLoggedIn'));
  }

  set isLoggedIn(value: boolean) {
    this.login.next(value);
    localStorage.setItem('isLoggedIn', String(value));
  }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  set token(value: string | undefined | null) {
    localStorage.setItem('accessToken', JSON.stringify(value));
  }

  get auth(): UserModel {
    return JSON.parse(String(localStorage.getItem('auth')));
  }

  set auth(user: UserModel | undefined | null) {
    localStorage.setItem('auth', JSON.stringify(user));
  }

  get permissions(): PermissionModel[] {
    return JSON.parse(String(localStorage.getItem('permissions')));
  }

  set permissions(permissions: PermissionModel[] | undefined | null) {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  get roles(): RoleModel[] {
    return JSON.parse(String(localStorage.getItem('role')));
  }

  set roles(role: RoleModel[] | undefined | null) {
    localStorage.setItem('role', JSON.stringify(role));
  }

  redirectUser() {
    this.login$.subscribe(async (isLoggedIn) => {
      if (!isLoggedIn) {
        await this.router.navigate([
          EnvRoutes.CORE + '/' + CoreRoutes.DASHBOARD,
        ]);
      }
    });
  }

  removeLogin() {
    localStorage.clear();
    this.login.next(false);
  }
}

import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@services/auth';
import {RoleModel} from '@models/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  private readonly roles: RoleModel[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.roles = authService.roles;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  private checkRole(route: ActivatedRouteSnapshot): boolean {
    if (this.roles) {
      for (const role of route.data['roles']) {
        if (this.roles.find(r => r.name?.toUpperCase() === role?.toUpperCase())) {
          return true;
        }
      }
    }
    this.router.navigate(['/common/access-denied']);
    return false;
  }

}

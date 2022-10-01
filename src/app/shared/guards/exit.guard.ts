import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OnExitInterface } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExitInterface,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.onExit() ?? true;
  }
}

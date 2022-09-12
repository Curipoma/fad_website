import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

export enum AppRoutesEnum {
  CORE = '/core',
  AUTH = '/auth',
  COMMON = '/common',
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private router: Router) {
  }

  get core(): string {
    return AppRoutesEnum.CORE;
  }

  get common(): string {
    return AppRoutesEnum.COMMON;
  }

  get appRoutes(): string {
    return '';
  }

  async login() {
    await this.router.navigateByUrl(`${AppRoutesEnum.AUTH}/login`);
  }

  async profile() {
    await this.router.navigateByUrl(`${AppRoutesEnum.AUTH}/profile`);
  }

  async dashboard() {
    await this.router.navigateByUrl(`/`);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@models/auth';
import { environment } from '@env/environment';

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

  redirectUser() {
    this.login$.subscribe(async (isLoggedIn) => {
      if (!isLoggedIn) {
        await this.router.navigate(['/common/dashboard']);
      }
    });
  }

  removeLogin() {
    localStorage.clear();
    this.login.next(false);
  }
}

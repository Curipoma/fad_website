import { Component } from '@angular/core';
import { LayoutService } from '@services/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginHttpService } from '@services/auth/login-http.service';
import { AuthService } from '@services/auth';
import { LoginResponseModel } from '@models/http';
import { Router } from '@angular/router';
import { CoreRoutes, EnvRoutes } from '@shared/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  form: FormGroup = this.newForm;
  password!: string;

  constructor(
    private authService: AuthService,
    public layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private loginHttpService: LoginHttpService,
    private router: Router
  ) {}

  get newForm(): FormGroup {
    return this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],

      password: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  ngSubmit() {
    if (this.form.valid) {
      this.loginHttpService
        .login<LoginResponseModel, LoginResponseModel>(this.form.value)
        .subscribe((res) => {
          this.authService.token = res.accessToken;
          this.router.navigate([EnvRoutes.CORE + '/' + CoreRoutes.DASHBOARD]);
          this.authService.isLoggedIn = true;
          this.authService.permissions = [];
          this.authService.roles = [];
        });
    }
  }
}

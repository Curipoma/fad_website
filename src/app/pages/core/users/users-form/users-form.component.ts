import { Component, OnInit } from '@angular/core';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaModel, MaterialModel } from '@models/core';
import {
  AreasHttpService,
  CoreService,
  MaterialsHttpService,
  UsersHttpService,
} from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@services/shared';
import { UserModel } from '@models/auth';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  id: number = 0;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  loaded: boolean = false;

  constructor(
    private usersHttpService: UsersHttpService,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private router: Router
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.getUser();
    }
  }

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
      lastname: [
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
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.messagesService.showError('Error', 'Llene todos los campos');
      this.form.markAllAsTouched();
    }
  }
  back(): void {
    this.router.navigate([this.envRoutes.CORE + this.coreRoutes.USERS_LIST]);
  }

  create(user: UserModel): void {
    this.usersHttpService
      .store<UserModel, UserModel>(user)
      .subscribe((user: UserModel) => {
        this.form.reset(user);
        this.back();
      });
  }

  update(user: UserModel): void {
    this.usersHttpService
      .update<UserModel, UserModel>(this.id, user)
      .subscribe((user) => {
        this.form.reset(user);
        this.back();
      });
  }

  getUser() {
    this.loaded = true;
    this.usersHttpService
      .show<UserModel>(this.id)
      .subscribe((user: UserModel) => {
        this.form.reset(user);
        this.loaded = false;
      });
  }

  get emailField() {
    return this.form.controls['email'];
  }
  get lastnameField() {
    return this.form.controls['lastname'];
  }
  get passwordField() {
    return this.form.controls['password'];
  }
  get nameField() {
    return this.form.controls['name'];
  }
}

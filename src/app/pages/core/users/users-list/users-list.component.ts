import { Component, OnInit } from '@angular/core';
import { ColumnModel, PaginatorModel } from '@models/core';
import { CoreRoutes, EnvRoutes, OtherRoutes } from '@shared/enums';
import { FormControl } from '@angular/forms';
import {
  CoreService,
  MessageCustomizationService,
  UsersHttpService,
} from '@services/core';
import { MessagesService } from '@services/shared';
import { Router } from '@angular/router';
import { UserModel } from '@models/auth';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  columns: ColumnModel[] = [];
  loaded$ = this.coreService.loaded$;
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  pagination$ = this.usersHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedUsers: UserModel[] = [];
  users: UserModel[] = [];
  loaded: boolean = false;

  constructor(
    private usersHttpService: UsersHttpService,
    public coreService: CoreService,
    public messageCustomizationService: MessageCustomizationService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => (this.paginator = pagination));
    this.search.valueChanges.subscribe(() => this.getUsers());
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = 0) {
    this.loaded = true;
    this.usersHttpService
      .index<UserModel[]>(page, this.search.value)
      .subscribe((users) => {
        users.map(
          (user) =>
            (user.passwordChangedText = JSON.parse(String(user.passwordChanged))
              ? 'Si'
              : 'No')
        );
        this.users = users;
        this.loaded = false;
      });
  }

  getColumns(): ColumnModel[] {
    return [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido' },
      { field: 'email', header: 'Correo' },
      { field: 'password', header: 'Clave' },
      { field: 'passwordChangedText', header: 'Clave Cambiada' },
      { field: 'createdAt', header: 'Fecha Creación' },
      { field: 'updatedAt', header: 'Fecha Actualización' },
      { field: 'deletedAt', header: 'Fecha Eliminación' },
    ];
  }

  paginate(event: any) {
    this.getUsers(event.page);
  }

  async redirectCreateForm() {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.USERS_FORM,
      OtherRoutes.NEW,
    ]);
  }

  async redirectEditForm(id: number) {
    await this.router.navigate([
      EnvRoutes.CORE + '/' + CoreRoutes.USERS_FORM,
      id,
    ]);
  }

  remove(id: number) {
    this.users = this.users.filter((user) => user.id !== id);

    const onConfirm = () => {
      this.usersHttpService.delete<UserModel>(id).subscribe(() => {
        this.getUsers();
      });
    };
    this.messagesService.questionAction(
      'Eliminar',
      '¿Segúro quieres eliminar este usuario ' + id + '?',
      'questionAction',
      onConfirm
    );
  }

  removeAll() {
    let userIds: number[] = [];
    this.selectedUsers.forEach((selectedMaterial) => {
      userIds.push(selectedMaterial.id);
    });
    const onConfirm = () => {
      this.usersHttpService.removeAll<number[]>(userIds).subscribe(() => {
        this.getUsers();
      });
    };
    const onReject = () => {};
    this.messagesService.questionAction(
      'Eliminar',
      '¿Seguro quieres eliminar estos usuarios?',
      'questionAction',
      onConfirm,
      onReject
    );
  }
}

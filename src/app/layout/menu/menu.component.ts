import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '@services/core';
import { AuthRoutes, CommonRoutes, CoreRoutes, EnvRoutes } from '@shared/enums';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  navRoutes: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.navRoutes = [
      {
        label: '',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink: [EnvRoutes.CORE + '/' + CommonRoutes.DASHBOARD],
          },
        ],
      },
      {
        label: 'Activos',
        items: [
          {
            label: 'Activos',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + CoreRoutes.ASSETS_LIST],
          },
          {
            label: 'Detalles de Activo',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + CoreRoutes.ASSET_DETAILS_LIST],
          },
        ],
      },
      {
        label: 'Enumerables',
        items: [
          {
            label: 'Enumerable',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUES_LIST],
          },
          {
            label: 'Tipo de Enumerable',
            icon: 'pi pi-fw pi-list',
            routerLink: [
              EnvRoutes.CORE + '/' + CoreRoutes.CATALOGUE_TYPES_LIST,
            ],
          },
        ],
      },
      {
        label: 'Administrar',
        items: [
          {
            label: 'Consumibles',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + CoreRoutes.CONSUMABLES_LIST],
          },
          {
            label: 'Materiales',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + CoreRoutes.MATERIALS_LIST],
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-list',
            routerLink: [EnvRoutes.CORE + '/' + AuthRoutes.USER_LIST],
          },
        ],
      },
    ];
  }
}

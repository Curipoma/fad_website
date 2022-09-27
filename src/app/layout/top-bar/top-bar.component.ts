import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { CoreRoutes, EnvRoutes } from '@shared/enums';
import { MessagesService } from '@services/shared';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  coreRoutes = CoreRoutes;
  envRoutes = EnvRoutes;
  menubarItems: MegaMenuItem[] = [];

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.menubarItems = [
      {
        label: 'Account',
        items: [
          [
            {
              items: [
                {
                  label: 'Setting',
                  icon: 'pi pi-fw pi-config',
                  url: '',
                },
                {
                  label: 'Log Out',
                  icon: 'pi pi-fw pi-config',
                  url: '',
                  command: () => this.logOut(),
                },
              ],
            },
          ],
        ],
      },

      {
        label: 'Products',
        items: [
          [
            {
              label: 'Users',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
            {
              label: 'Asset Details',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
            {
              label: 'Assets',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
            {
              label: 'Consumables',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
            {
              label: 'Materials',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
          ],
        ],
      },
      {
        label: 'Designations',
        items: [
          [
            {
              label: 'Catalogue Types',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
            {
              label: 'Catalogues',
              items: [
                {
                  label: 'Create',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'List',
                  icon: 'pi pi-fw pi-list',
                },
              ],
            },
          ],
        ],
      },
    ];
  }

  private logOut() {
    const summary = 'Correcto';
    const detail = 'Cierre de sesión correcto';
    this.messagesService.showSuccess(summary, detail);
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthRoutes, CommonRoutes, EnvRoutes } from '@shared/enums';
import { LayoutService } from '@services/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  items!: MenuItem[];
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  commonRoutes = CommonRoutes;
  envRoutes = EnvRoutes;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.router.navigate([EnvRoutes.COMMON + '/' + CommonRoutes.PAGE]);
    this.authService.removeLogin();
  }
  showAccount() {
    this.router.navigate([EnvRoutes.AUTH + '/' + AuthRoutes.ACCOUNT]);
  }
  showSetting() {
    this.router.navigate([EnvRoutes.AUTH + '/' + AuthRoutes.SETTINGS]);
  }
}

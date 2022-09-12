import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';
import { CoreService } from '@services/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loaded$ = this.coreService.loaded$;

  constructor(
    private authService: AuthService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.authUser();
  }

  async authUser() {
    await this.authService.redirectUser();
  }
}

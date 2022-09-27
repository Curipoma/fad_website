import { Component } from '@angular/core';
import { CoreService } from '@services/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaded$ = this.coreService.loaded$;

  constructor(private coreService: CoreService) {}
}

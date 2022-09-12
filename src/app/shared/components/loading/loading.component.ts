import { Component, OnInit } from '@angular/core';
import { CoreService } from '@services/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loaded$ = this.coreService.loaded$;

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {}
}

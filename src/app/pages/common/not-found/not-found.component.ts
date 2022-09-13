import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  statusTitle: string | undefined = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.statusTitle = this.activatedRoute.snapshot.routeConfig?.['path'];
  }
}

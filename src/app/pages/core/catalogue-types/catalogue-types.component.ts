import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-catalogue-types',
  templateUrl: './catalogue-types.component.html',
  styleUrls: ['./catalogue-types.component.scss'],
})
export class CatalogueTypesComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.redirectUser();
  }
}

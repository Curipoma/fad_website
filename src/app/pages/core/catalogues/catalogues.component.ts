import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss'],
})
export class CataloguesComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.redirectUser();
  }
}

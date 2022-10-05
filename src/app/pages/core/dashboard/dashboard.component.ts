import { Component, OnInit } from '@angular/core';
import { AreasHttpService } from '@services/core';
import { AreaModel } from '@models/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  areas: AreaModel[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  constructor(private areasHttpService: AreasHttpService) {}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas() {
    this.areasHttpService
      .index<AreaModel[]>()
      .subscribe((areas: AreaModel[]) => {
        this.areas = areas;
        console.log(this.areas);
      });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}

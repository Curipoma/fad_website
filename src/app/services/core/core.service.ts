import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginatorModel } from '@models/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private loaded = new BehaviorSubject<boolean>(false);
  public loaded$ = this.loaded.asObservable();

  constructor() {}

  showLoad(): void {
    this.loaded.next(true);
  }

  hideLoad(): void {
    this.loaded.next(false);
  }

  get paginator(): PaginatorModel {
    return {
      page: 0,
      limit: 5,
      totalItems: 0,
    };
  }
}

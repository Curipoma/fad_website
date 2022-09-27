import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguesListComponent } from './catalogues-list.component';

describe('CataloguesListComponent', () => {
  let component: CataloguesListComponent;
  let fixture: ComponentFixture<CataloguesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueTypesListComponent } from './catalogue-types-list.component';

describe('CatalogueTypesListComponent', () => {
  let component: CatalogueTypesListComponent;
  let fixture: ComponentFixture<CatalogueTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueTypesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

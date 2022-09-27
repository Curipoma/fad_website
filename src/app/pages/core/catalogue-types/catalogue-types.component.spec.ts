import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueTypesComponent } from './catalogue-types.component';

describe('CatalogueTypesComponent', () => {
  let component: CatalogueTypesComponent;
  let fixture: ComponentFixture<CatalogueTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueTypesFormComponent } from './catalogue-types-form.component';

describe('CatalogueTypesFormComponent', () => {
  let component: CatalogueTypesFormComponent;
  let fixture: ComponentFixture<CatalogueTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueTypesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

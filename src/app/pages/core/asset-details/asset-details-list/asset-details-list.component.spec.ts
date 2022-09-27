import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsListComponent } from './asset-details-list.component';

describe('AssetDetailsListComponent', () => {
  let component: AssetDetailsListComponent;
  let fixture: ComponentFixture<AssetDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

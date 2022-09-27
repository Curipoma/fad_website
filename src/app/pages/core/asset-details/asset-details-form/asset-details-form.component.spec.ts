import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsFormComponent } from './asset-details-form.component';

describe('AssetDetailsFormComponent', () => {
  let component: AssetDetailsFormComponent;
  let fixture: ComponentFixture<AssetDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

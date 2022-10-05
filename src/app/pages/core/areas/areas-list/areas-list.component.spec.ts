import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasListComponent } from './areas-list.component';

describe('AreasListComponent', () => {
  let component: AreasListComponent;
  let fixture: ComponentFixture<AreasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

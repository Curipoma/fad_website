import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumablesListComponent } from './consumables-list.component';

describe('ConsumablesListComponent', () => {
  let component: ConsumablesListComponent;
  let fixture: ComponentFixture<ConsumablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumablesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

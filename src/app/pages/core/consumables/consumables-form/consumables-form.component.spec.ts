import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumablesFormComponent } from './consumables-form.component';

describe('ConsumablesFormComponent', () => {
  let component: ConsumablesFormComponent;
  let fixture: ComponentFixture<ConsumablesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumablesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

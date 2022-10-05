import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasFormComponent } from './areas-form.component';

describe('AreasFormComponent', () => {
  let component: AreasFormComponent;
  let fixture: ComponentFixture<AreasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

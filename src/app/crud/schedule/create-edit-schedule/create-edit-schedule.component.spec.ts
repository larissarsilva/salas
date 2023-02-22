import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditScheduleComponent } from './create-edit-schedule.component';

describe('CreateEditScheduleComponent', () => {
  let component: CreateEditScheduleComponent;
  let fixture: ComponentFixture<CreateEditScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

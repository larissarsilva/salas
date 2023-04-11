import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInProgressComponent } from './create-edit-in-progress.component';

describe('CreateEditInProgressComponent', () => {
  let component: CreateEditInProgressComponent;
  let fixture: ComponentFixture<CreateEditInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

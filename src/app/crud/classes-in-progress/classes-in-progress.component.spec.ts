import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesInProgressComponent } from './classes-in-progress.component';

describe('ClassesInProgressComponent', () => {
  let component: ClassesInProgressComponent;
  let fixture: ComponentFixture<ClassesInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

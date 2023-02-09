import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProfessorComponent } from './create-edit-professor.component';

describe('CreateEditProfessorComponent', () => {
  let component: CreateEditProfessorComponent;
  let fixture: ComponentFixture<CreateEditProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

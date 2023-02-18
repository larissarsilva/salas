import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRoomComponent } from './create-edit-room.component';

describe('CreateEditRoomComponent', () => {
  let component: CreateEditRoomComponent;
  let fixture: ComponentFixture<CreateEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

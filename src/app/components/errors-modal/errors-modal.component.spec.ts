import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsModalComponent } from './errors-modal.component';

describe('ErrorsModalComponent', () => {
  let component: ErrorsModalComponent;
  let fixture: ComponentFixture<ErrorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

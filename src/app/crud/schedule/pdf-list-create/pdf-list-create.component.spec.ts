import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfListCreateComponent } from './pdf-list-create.component';

describe('PdfListCreateComponent', () => {
  let component: PdfListCreateComponent;
  let fixture: ComponentFixture<PdfListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfListCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

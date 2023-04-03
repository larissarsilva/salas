import { TestBed } from '@angular/core/testing';

import { ErrorsModalService } from './errors-modal.service';

describe('ErrorsModalService', () => {
  let service: ErrorsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

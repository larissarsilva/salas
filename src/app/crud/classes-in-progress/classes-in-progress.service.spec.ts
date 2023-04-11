import { TestBed } from '@angular/core/testing';

import { ClassesInProgressService } from './classes-in-progress.service';

describe('ClassesInProgressService', () => {
  let service: ClassesInProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesInProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

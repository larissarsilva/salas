import { TestBed } from '@angular/core/testing';

import { FirstAccessService } from './first-access.service';

describe('FirstAccessService', () => {
  let service: FirstAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

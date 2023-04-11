import { TestBed } from '@angular/core/testing';

import { AdmGuardGuard } from './adm-guard.service';

describe('AdmGuardGuard', () => {
  let guard: AdmGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

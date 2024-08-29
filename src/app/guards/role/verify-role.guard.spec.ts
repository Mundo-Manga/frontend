import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyRoleGuard } from './verify-role.guard';

describe('verifyRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifyRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

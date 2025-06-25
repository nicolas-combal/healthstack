import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth-guard';

describe('authGuard', () => {
  const authGuardFn: CanActivateFn = () => {
    return TestBed.runInInjectionContext(() => {
      const guard = TestBed.inject(AuthGuard);
      return guard.canActivate();
    });
  };


  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(authGuardFn).toBeTruthy();
  });
});

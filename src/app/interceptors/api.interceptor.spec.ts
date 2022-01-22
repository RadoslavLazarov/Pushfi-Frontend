import { TestBed } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';

describe('LoadingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

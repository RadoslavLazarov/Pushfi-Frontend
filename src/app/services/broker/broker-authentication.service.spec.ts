import { TestBed } from '@angular/core/testing';

import { BrokerAuthenticationService } from './broker-authentication.service';

describe('BrokerAuthenticationService', () => {
  let service: BrokerAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokerAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

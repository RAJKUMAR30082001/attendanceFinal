import { TestBed } from '@angular/core/testing';

import { CheckValidityService } from './check-validity.service';

describe('CheckValidityService', () => {
  let service: CheckValidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckValidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

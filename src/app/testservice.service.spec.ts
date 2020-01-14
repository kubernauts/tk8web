import { TestBed } from '@angular/core/testing';

import { TestserviceService } from './testservice.service';

describe('TestserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestserviceService = TestBed.get(TestserviceService);
    expect(service).toBeTruthy();
  });
});

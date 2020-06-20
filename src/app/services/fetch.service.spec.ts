import { TestBed } from '@angular/core/testing';

import { FetchService } from './services/fetch.service';

describe('FetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchService = TestBed.get(FetchService);
    expect(service).toBeTruthy();
  });
});

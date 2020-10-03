import { TestBed } from '@angular/core/testing';

import { WorkStateService } from './services/work-state.service';

describe('WorkStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkStateService = TestBed.get(WorkStateService);
    expect(service).toBeTruthy();
  });
});

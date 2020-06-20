import { TestBed } from '@angular/core/testing';

import { ProjectParserService } from './project-parser.service';

describe('ProjectParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectParserService = TestBed.get(ProjectParserService);
    expect(service).toBeTruthy();
  });
});

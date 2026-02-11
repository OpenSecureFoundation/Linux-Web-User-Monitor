import { TestBed } from '@angular/core/testing';

import { SystemStatsService } from './system-stats.service';

describe('SystemStatsService', () => {
  let service: SystemStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

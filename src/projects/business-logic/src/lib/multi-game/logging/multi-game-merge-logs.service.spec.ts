import { TestBed } from '@angular/core/testing';

import { MultiGameMergeLogsService } from './multi-game-merge-logs.service';

describe('MultiGameMergeLogsService', () => {
  let service: MultiGameMergeLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiGameMergeLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MultiGameLoggingService } from './multi-game-logging.service';

describe('MultiGameLoggingService', () => {
  let service: MultiGameLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiGameLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

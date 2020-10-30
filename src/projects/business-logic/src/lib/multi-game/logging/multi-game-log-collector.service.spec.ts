import { TestBed } from '@angular/core/testing';

import { MultiGameLogCollectorService } from './multi-game-log-collector.service';

describe('MultiGameLogCollectorService', () => {
  let service: MultiGameLogCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiGameLogCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

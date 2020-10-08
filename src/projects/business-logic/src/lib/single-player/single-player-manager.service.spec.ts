import { TestBed } from '@angular/core/testing';

import { SinglePlayerManagerService } from './single-player-manager.service';

describe('SinglePlayerManagerService', () => {
  let service: SinglePlayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePlayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

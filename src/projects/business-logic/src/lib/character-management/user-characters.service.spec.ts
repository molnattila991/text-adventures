import { TestBed } from '@angular/core/testing';

import { UserCharactersService } from './user-characters.service';

describe('UserCharactersService', () => {
  let service: UserCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

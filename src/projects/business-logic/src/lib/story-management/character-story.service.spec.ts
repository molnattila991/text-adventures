import { TestBed } from '@angular/core/testing';

import { CharacterStoryService } from './character-story.service';

describe('CharacterStoryService', () => {
  let service: CharacterStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

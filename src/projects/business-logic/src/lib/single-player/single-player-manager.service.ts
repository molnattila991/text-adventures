import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CharacterStoryItem, SingleGameState } from '@text-adventures/shared';
import { ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

export interface SinglePlayerGame {
  start(): void;
}

@Injectable()
export class SinglePlayerManagerService implements SinglePlayerGame {

  private start$: ReplaySubject<void> = new ReplaySubject();
  private gameState$: ReplaySubject<SingleGameState> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyItemService: CharacterStoryItem
  ) {
    this.start$.pipe(
      withLatestFrom(
        this.storyService.getSelectedItem()
      ), map(([start, story]) => story.firstPageId)
    ).subscribe(this.storyItemService.selectStoryItem);

    this.start$.subscribe(()=>this.gameState$.next(SingleGameState.story));
  }

  start(): void {
    this.start$.next();
  }
}

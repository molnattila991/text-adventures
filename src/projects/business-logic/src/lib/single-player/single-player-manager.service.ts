import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CharacterStoryItem, CommandOutputMessage, CommandOutputType, CommandOutputWrite, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, SingleGameState, SinglePlayerGame, StoryPageModel } from '@text-adventures/shared';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { StoryState, StoryStateService } from '../story-management/story-state.service';
import { StoryPageService } from '../story-management/story-page.service';

@Injectable()
export class SinglePlayerManagerService implements SinglePlayerGame, CharacterStoryItem {

  private start$: ReplaySubject<void> = new ReplaySubject();
  private inspect$: ReplaySubject<void> = new ReplaySubject();
  private gameState$: ReplaySubject<SingleGameState> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    private storyState: StoryStateService,
    private storyPageService: StoryPageService,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService) private storyPageDataProvider: IGenericCrudDataProvider<StoryPageModel>

  ) {
    this.storyItemSubscriptions();
  }
  selectOptionByIndex(index: number): void {
    this.storyPageService.selectOptionByIndex(index);
  }

  start(): void {
    this.start$.next();
  }

  inspect(): void {
    this.inspect$.next();
  }

  private storyItemSubscriptions() {

    this.start$.pipe(
      withLatestFrom(
        this.storyService.getSelectedItem()
      ), map(([start, story]) => story.firstPageId)
    ).subscribe(v => {
      this.storyPageService.selectStoryItem(v)
    });

    this.start$.subscribe(() => this.gameState$.next(SingleGameState.story));

    this.storyPageService.getSelectedStoryItem().pipe(
      map(item => item.enemies != undefined && item.enemies.length > 0)
    ).subscribe(storyHasEnemies => {
      if (storyHasEnemies) {
        this.storyState.setStoryState(StoryState.BattleIntro);
      } else {
        this.storyState.setStoryState(StoryState.InStory);
      }
    });

    this.storyPageService.getSelectedStoryItem().pipe(
      map(s => s.enemies)
    ).subscribe(enemies => {
      console.log(enemies);
    })

    combineLatest([this.storyPageService.getSelectedStoryItem(), this.storyState.getStoryState()])
      .subscribe(([s, storyState]) => this.inspectStory(s, storyState));

    this.inspect$
      .pipe(
        withLatestFrom(
          this.storyPageService.getSelectedStoryItem(),
          this.storyState.getStoryState()
        ))
      .subscribe(([i, s, storyState]) => this.inspectStory(s, storyState));
  }

  private inspectStory(s: StoryPageModel, storyState: StoryState) {
    switch (storyState) {
      case StoryState.BattleIntro:
        this.output.push([<CommandOutputMessage>{ message: s.text }]);
        this.output.pushText(["Add ki a 'battle start' parncsot a folytatáshoz."]);
        break;
      case StoryState.InStory:
        this.output.push([<CommandOutputMessage>{ message: s.text }]);
        s.options.forEach((option, index) => {
          this.output.push([<CommandOutputMessage>{ message: (index + 1) + ". " + option.text, id: (index + 1), type: CommandOutputType.StoryItem }]);
        });
        break;
    }

    this.output.flush();
  }
}

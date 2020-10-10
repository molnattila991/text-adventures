import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CharacterStoryItem, CommandOutputMessage, CommandOutputType, CommandOutputWrite, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, SingleGameState, SinglePlayerGame, StoryPageModel } from '@text-adventures/shared';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class SinglePlayerManagerService implements SinglePlayerGame, CharacterStoryItem {

  private start$: ReplaySubject<void> = new ReplaySubject();
  private inspect$: ReplaySubject<void> = new ReplaySubject();
  private gameState$: ReplaySubject<SingleGameState> = new ReplaySubject();

  private storyItemsForSelectedStory$: ReplaySubject<HashMap<StoryPageModel>> = new ReplaySubject();
  private selectStoryItem$: ReplaySubject<string> = new ReplaySubject();
  private selectStoryItemByIndex$: ReplaySubject<number> = new ReplaySubject();
  private selectedStoryItem$: ReplaySubject<StoryPageModel> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService) private storyPageDataProvider: IGenericCrudDataProvider<StoryPageModel>

  ) {
    this.storyItemSubscriptions();
  }
  selectOptionByIndex(index: number): void {
    this.selectStoryItemByIndex$.next(index);
  }

  start(): void {
    this.start$.next();
  }

  inspect(): void {
    this.inspect$.next();
  }

  selectStoryItem(id: string): void {
    this.selectStoryItem$.next(id);
  }

  private storyItemSubscriptions() {
    this.storyService.getSelectedItem().pipe(
      switchMap(v => {
        return this.storyPageDataProvider.getHashFiltered("storyId", v.id, "==")
      })
    ).subscribe(this.storyItemsForSelectedStory$);

    this.selectStoryItem$
      .pipe(
        withLatestFrom(this.storyItemsForSelectedStory$),
        map(([id, hash]) => hash[id]))
      .subscribe(this.selectedStoryItem$);

    this.selectStoryItemByIndex$
      .pipe(
        withLatestFrom(this.selectedStoryItem$),
        map(([index, storyItem]) => {
          const item = storyItem.options[index - 1];
          if (item)
            return item.destinationId;
          else
            throw "Index " + index + " nem megfelelő. Type 'story inspect' to list selectable indexes";
        })
      ).subscribe((id) => {
        this.selectStoryItem$.next(id);
      }, (error) => {
        this.output.pushText([error.message]);
      })

    this.start$.pipe(
      withLatestFrom(
        this.storyService.getSelectedItem()
      ), map(([start, story]) => story.firstPageId)
    ).subscribe(v => this.selectStoryItem(v));

    this.start$.subscribe(() => this.gameState$.next(SingleGameState.story));

    this.selectedStoryItem$.subscribe(s => this.inspectStory(s));
    this.inspect$.pipe(withLatestFrom(this.selectedStoryItem$), map(([i, s]) => s)).subscribe(s => this.inspectStory(s));
  }

  private inspectStory(s: StoryPageModel) {
    this.output.push([<CommandOutputMessage>{ message: s.text }]);
    s.options.forEach((option, index) => {
      this.output.push([<CommandOutputMessage>{ message: (index + 1) + ". " + option.text, id: (index + 1), type: CommandOutputType.StoryItem }]);
    });
  }
}

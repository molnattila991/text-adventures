import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CharacterStoryItem, CommandOutputWrite, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, SingleGameState, SinglePlayerGame, StoryPageModel } from '@text-adventures/shared';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class SinglePlayerManagerService implements SinglePlayerGame, CharacterStoryItem {

  private start$: ReplaySubject<void> = new ReplaySubject();
  private gameState$: ReplaySubject<SingleGameState> = new ReplaySubject();

  private storyItemsForSelectedStory$: ReplaySubject<HashMap<StoryPageModel>> = new ReplaySubject();
  private selectStoryItem$: ReplaySubject<string> = new ReplaySubject();
  private selectedStoryItem$: ReplaySubject<StoryPageModel> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService) private storyPageDataProvider: IGenericCrudDataProvider<StoryPageModel>

  ) {
    this.storyItemSubscriptions();

    this.start$.pipe(
      withLatestFrom(
        this.storyService.getSelectedItem()
      ), map(([start, story]) => story.firstPageId)
    ).subscribe(v => this.selectStoryItem(v));

    this.start$.subscribe(() => this.gameState$.next(SingleGameState.story));

    this.selectedStoryItem$.subscribe(s => {
      this.output.push([s.text]);
      s.options.forEach(option => {
        this.output.push([option.text]);
      })

      this.output.flush();
    })
  }

  start(): void {
    this.start$.next();
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

    combineLatest([this.selectStoryItem$, this.storyItemsForSelectedStory$])
      .pipe(map(([id, hash]) => hash[id]))
      .subscribe(this.selectedStoryItem$);
  }
}

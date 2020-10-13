import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterStory, CommandOutputWrite, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, StoryPageModel } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class StoryPageService {
  private storyItemsForSelectedStory$: ReplaySubject<HashMap<StoryPageModel>> = new ReplaySubject();
  private selectStoryItem$: ReplaySubject<string> = new ReplaySubject();
  private selectStoryItemByIndex$: ReplaySubject<number> = new ReplaySubject();
  private selectedStoryItem$: ReplaySubject<StoryPageModel> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService) private storyService: CharacterStory,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService) private storyPageDataProvider: IGenericCrudDataProvider<StoryPageModel>
  ) {
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
  }

  getSelectedStoryItem(): Observable<StoryPageModel> {
    return this.selectedStoryItem$.asObservable();
  }

  selectOptionByIndex(index: number): void {
    this.selectStoryItemByIndex$.next(index);
  }

  selectStoryItem(id: string): void {
    this.selectStoryItem$.next(id);
  }
}

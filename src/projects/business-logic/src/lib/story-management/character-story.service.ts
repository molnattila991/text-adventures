import { Inject, Injectable } from '@angular/core';
import { HashMap, BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, UserCharacters, StoryModel, CharacterStory, StoryPageModel, CharacterStoryItem } from '@text-adventures/shared';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CharacterStoryService implements CharacterStory, CharacterStoryItem {

  private storiesForSelectedCharacter$: ReplaySubject<HashMap<StoryModel>> = new ReplaySubject();
  private selectedItem$: ReplaySubject<StoryModel> = new ReplaySubject();
  private selectItem$: ReplaySubject<string> = new ReplaySubject();

  private storyItemsForSelectedStory$: ReplaySubject<HashMap<StoryPageModel>> = new ReplaySubject();
  private selectStoryItem$: ReplaySubject<string> = new ReplaySubject();
  private selectedStoryItem$: ReplaySubject<StoryPageModel> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) public userCharactersService: UserCharacters,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryDataProviderService) private storyDataProvider: IGenericCrudDataProvider<StoryModel>,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService) private storyPageDataProvider: IGenericCrudDataProvider<StoryPageModel>
  ) {
    this.storySubscriptions();
    this.storyItemSubscriptions();
  }

  getStoriesForCharacter(): Observable<HashMap<StoryModel>> {
    return this.storiesForSelectedCharacter$.asObservable();
  }

  getStoriesForCharacterAsArray(): Observable<StoryModel[]> {
    return this.getStoriesForCharacter().pipe(map(h => Object.keys(h).map(k => h[k])));
  }

  select(id: string): void {
    localStorage.setItem("selectedStoryId", id);
    this.selectItem$.next(id);
  }

  getSelectedItem(): Observable<StoryModel> {
    return this.selectedItem$.asObservable();
  }

  selectStoryItem(id: string): void {
    localStorage.setItem("selectedStoryItemId", id);
    this.selectStoryItem$.next(id);
  }

  getSelectedStoryItem(): Observable<StoryPageModel> {
    return this.selectedStoryItem$.asObservable();
  }

  private storySubscriptions() {
    this.userCharactersService.getSelectedCharacter().pipe(
      switchMap(v => {
        return this.storyDataProvider.getHashFiltered("id", v.stories, "in")
      })
    ).subscribe(this.storiesForSelectedCharacter$);

    const id = localStorage.getItem("selectedStoryId");
    id && this.select(id);

    combineLatest([this.selectItem$, this.storiesForSelectedCharacter$])
      .pipe(map(([id, hash]) => hash[id]))
      .subscribe(this.selectedItem$);
  }

  private storyItemSubscriptions() {
    this.selectedItem$.pipe(
      switchMap(v => {
        return this.storyPageDataProvider.getHashFiltered("storyId", v.id, "==")
      })
    ).subscribe(this.storyItemsForSelectedStory$);


    const storyItemId = localStorage.getItem("selectedStoryItemId");
    storyItemId && this.selectStoryItem(storyItemId);

    combineLatest([this.selectStoryItem$, this.storyItemsForSelectedStory$])
      .pipe(map(([id, hash]) => hash[id]))
      .subscribe(this.selectedStoryItem$);
  }
}

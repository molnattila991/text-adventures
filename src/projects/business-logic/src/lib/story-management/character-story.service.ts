import { Inject, Injectable } from '@angular/core';
import { HashMap, BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, UserCharacters, StoryModel, CharacterStory, StoryPageModel, CharacterStoryItem } from '@text-adventures/shared';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CharacterStoryService implements CharacterStory {

  private storiesForSelectedCharacter$: ReplaySubject<HashMap<StoryModel>> = new ReplaySubject();
  private selectedItem$: ReplaySubject<StoryModel> = new ReplaySubject();
  private selectItem$: ReplaySubject<string> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) public userCharactersService: UserCharacters,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryDataProviderService) private storyDataProvider: IGenericCrudDataProvider<StoryModel>
  ) {
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
}

import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterPlayerModel, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, UserCharacters, UserHandling } from '@text-adventures/shared';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserCharactersService implements UserCharacters {
  private charactersForLoggedInPlayer$: ReplaySubject<HashMap<CharacterPlayerModel>> = new ReplaySubject();
  private selectedCharacter$: ReplaySubject<CharacterPlayerModel> = new ReplaySubject();
  private selectCharacter$: ReplaySubject<string> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userData: UserHandling,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UserCharactersDataProviderService) private userCharacterDataProvider: IGenericCrudDataProvider<CharacterPlayerModel>
  ) {

    this.userData.getLoggedInUser().pipe(
      switchMap(v => {
        return this.userCharacterDataProvider.getHashFiltered("userId", v.id)
      })
    ).subscribe(v => {
      this.charactersForLoggedInPlayer$.next(v);
    });


    const id = localStorage.getItem("selectedCharacterId");
    id && this.selectCharacter(id);

    combineLatest([this.selectCharacter$, this.charactersForLoggedInPlayer$])
      .pipe(map(([id, hash]) => hash[id]))
      .subscribe(this.selectedCharacter$);
  }

  getCharactersForUser(): Observable<HashMap<CharacterPlayerModel>> {
    return this.charactersForLoggedInPlayer$.asObservable();
  }

  getCharactersForUserAsArray(): Observable<CharacterPlayerModel[]> {
    return this.getCharactersForUser().pipe(map(h => Object.keys(h).map(k => h[k])));
  }

  selectCharacter(id: string) {
    localStorage.setItem("selectedCharacterId", id);
    this.selectCharacter$.next(id);
  }

  getSelectedCharacter(): Observable<CharacterPlayerModel> {
    return this.selectedCharacter$.asObservable();
  }
}

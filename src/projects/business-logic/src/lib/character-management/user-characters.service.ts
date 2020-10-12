import { Inject, Injectable } from '@angular/core';
import { AbilityModel, BaseDataCollection, BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterPlayerModel, CharacterPlayerModelExpanded, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, ItemModel, STORE_INJECTION_TOKEN, UserCharacters, UserHandling } from '@text-adventures/shared';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserCharactersService implements UserCharacters {
  private charactersForLoggedInPlayer$: ReplaySubject<HashMap<CharacterPlayerModel>> = new ReplaySubject();
  private selectedCharacter$: ReplaySubject<CharacterPlayerModelExpanded> = new ReplaySubject();
  private selectCharacter$: ReplaySubject<string> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userData: UserHandling,
    @Inject(STORE_INJECTION_TOKEN.ItemStoreService) private items: BaseDataCollection<ItemModel>,
    @Inject(STORE_INJECTION_TOKEN.AbilityStoreService) private abilities: BaseDataCollection<AbilityModel>,
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

    combineLatest([
      this.selectCharacter$,
      this.charactersForLoggedInPlayer$,
      combineLatest([
        this.items.getHash(), this.abilities.getHash()
      ])
    ])
      .pipe(map(([id, hash, [items, abilities]]) => {
        const original = hash[id];
        const character: CharacterPlayerModelExpanded = JSON.parse(JSON.stringify(original));

        Object.keys(original.abilities).forEach(key => {
          character.abilities[key].ability = abilities[key];
        });

        Object.keys(original.items).forEach(key => {
          character.items[key].item = items[key];
        });

        Object.keys(original.inventory.items).forEach(key => {
          character.inventory.items[key].item = items[key];
        });

        return character;
      }))
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

  getSelectedCharacter(): Observable<CharacterPlayerModelExpanded> {
    return this.selectedCharacter$.asObservable();
  }
}

import { Inject, Injectable } from '@angular/core';
import {
  BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, STORE_INJECTION_TOKEN,
  BaseDataCollection, CharacterModel, CharacterPlayerCreateModel,
  CharacterPlayerModel, DATA_PROVIDER_INJECTION_TOKEN,
  IGenericCrudDataProvider, CreateCharacter
} from '@text-adventures/shared';
import { Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CreateCharacterService implements CreateCharacter {
  private saveItem$: Subject<CharacterPlayerCreateModel> = new Subject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userData: UserHandling,
    @Inject(STORE_INJECTION_TOKEN.CharacterStoreService) private characterData: BaseDataCollection<CharacterModel>,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UserCharactersDataProviderService) private userCharacterDataProvider: IGenericCrudDataProvider<CharacterPlayerModel>
    ) {

    this.saveItem$.pipe(
      withLatestFrom(
        this.userData.getLoggedInUser(),
        this.characterData.getHash()
      ),
      map(([saveItem, user, characters]) => {
        const selectedCharacter = characters[saveItem.characterId];
        const character: CharacterPlayerModel = <CharacterPlayerModel>{
          ...selectedCharacter,
          characterName: saveItem.characterName,
          userId: user.id
        };

        return character;
      })
    ).subscribe(c => {
      this.userCharacterDataProvider.add(c);
      //TODO update player
    },
      (e) => {
        console.log(e);
        //TODO: logging
      });
  }

  save(item: CharacterPlayerCreateModel) {
    this.saveItem$.next(item);
  }
}

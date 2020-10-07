import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterPlayerModel, DATA_PROVIDER_INJECTION_TOKEN, HashMap, IGenericCrudDataProvider, UserHandling } from '@text-adventures/shared';
import { ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class UserCharactersService {
  private charactersForLoggedInPlayer$: ReplaySubject<HashMap<CharacterPlayerModel>> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userData: UserHandling,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UserCharactersDataProviderService) private userCharacterDataProvider: IGenericCrudDataProvider<CharacterPlayerModel>
  ) {
    this.userData.getLoggedInUser().pipe(
      mergeMap(v => {
        return this.userCharacterDataProvider.getHashFiltered("userId", v.id)
      })
    ).subscribe(v => {
      this.charactersForLoggedInPlayer$.next(v);
    });
  }

  getCharactersForUser() {
    return this.charactersForLoggedInPlayer$.asObservable();
  }
}

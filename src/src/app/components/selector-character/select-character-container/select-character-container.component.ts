import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, CharacterPlayerModel, BUSSINESS_LOGIC_INJECTION_TOKEN, HashMap } from '@text-adventures/shared';
import { UserCharactersService } from 'projects/business-logic/src/lib/character-management/user-characters.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-character-container',
  template: `
    <app-select-character-view [characters]="this.getCharacterList()|async" (deleted)="delete($event)"></app-select-character-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCharacterContainerComponent {

  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UserCharactersDataProviderService) private userCharacterDataProvider: IGenericCrudDataProvider<CharacterPlayerModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) public userCharactersService: UserCharactersService
  ) { }

  getCharacterList(): Observable<CharacterPlayerModel[]> {
    return this.userCharactersService.getCharactersForUser().pipe(
      map(hash => {
        return Object.keys(hash).map(item => hash[item]);;
      })
    );
  }

  async delete(id: string): Promise<void> {
    try {
      await this.userCharacterDataProvider.delete(id);
    } catch (error) {
      //TODO: logging
      console.log(error);
    }
  }

}

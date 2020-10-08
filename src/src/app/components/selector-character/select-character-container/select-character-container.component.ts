import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, CharacterPlayerModel, BUSSINESS_LOGIC_INJECTION_TOKEN, HashMap, UserCharacters } from '@text-adventures/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-character-container',
  template: `
    <app-select-character-view [characters]="this.getCharacterList()|async" 
    (deleted)="delete($event)"
    (selected)="select($event)"></app-select-character-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCharacterContainerComponent {

  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.UserCharactersDataProviderService) private userCharacterDataProvider: IGenericCrudDataProvider<CharacterPlayerModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) public userCharactersService: UserCharacters
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

  select(id: string): void {
    this.userCharactersService.selectCharacter(id);
  }

}

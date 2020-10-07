import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseDataCollection, BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterModel, STORE_INJECTION_TOKEN, UserHandling } from '@text-adventures/shared';

@Component({
  selector: 'app-create-character-container',
  template: `
   <app-create-character-view [characterList]="getCharacterList()|async"></app-create-character-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterContainerComponent {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userData: UserHandling,
    @Inject(STORE_INJECTION_TOKEN.CharacterStoreService) private characterData: BaseDataCollection<CharacterModel>
  ) { }

  getCharacterList() {
    return this.characterData.getSelectList();
  }
}

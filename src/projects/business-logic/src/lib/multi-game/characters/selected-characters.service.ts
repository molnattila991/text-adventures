import { Inject, Injectable } from '@angular/core';
import { CharacterPlayerModel, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomModel } from '@text-adventures/shared';
import { SelectedItemsService } from '../../selected-item/selected-items.service';

@Injectable()
export class SelectedCharactersService extends SelectedItemsService<CharacterPlayerModel> {

  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) protected dataProvider: IGenericCrudDataProvider<CharacterPlayerModel>

  ) {
    super(dataProvider)
  }
}

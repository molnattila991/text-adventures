import { Inject, Injectable } from '@angular/core';
import { RoomModel, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider } from '@text-adventures/shared';
import { SelectedItemService } from '../../selected-item/selected-item-service';


@Injectable()
export class SelectedRoomService extends SelectedItemService<RoomModel>{
  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) protected dataProvider: IGenericCrudDataProvider<RoomModel>
  ) {
    super(dataProvider);
  }
}

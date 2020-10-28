import { Inject, Injectable } from '@angular/core';
import { IGenericCrudDataProvider, MultiGameRoomState, GenericCrudService } from '@text-adventures/shared';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';

@Injectable()
export class MultiGameStateDataProviderService extends GenericCrudDataProvider<MultiGameRoomState>
  implements IGenericCrudDataProvider<MultiGameRoomState> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'multi-game-state');
  }
}

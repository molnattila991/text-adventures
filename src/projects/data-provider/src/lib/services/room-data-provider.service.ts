import { Injectable, Inject } from '@angular/core';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';
import { IGenericCrudDataProvider, GenericCrudService, RoomModel } from '@text-adventures/shared';

@Injectable()
export class RoomsDataProviderService
  extends GenericCrudDataProvider<RoomModel>
  implements IGenericCrudDataProvider<RoomModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'rooms');
  }
}

import { Injectable, Inject } from '@angular/core';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';
import { IGenericCrudDataProvider, GenericCrudService, RoomTitleModel } from '@text-adventures/shared';

@Injectable()
export class RoomsTitleDataProviderService
  extends GenericCrudDataProvider<RoomTitleModel>
  implements IGenericCrudDataProvider<RoomTitleModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'rooms-title');
  }
}

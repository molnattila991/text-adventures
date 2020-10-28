import { Inject, Injectable } from '@angular/core';
import { GenericCrudService, IGenericCrudDataProvider, RoomModel, RoomVotes } from '@text-adventures/shared';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';

@Injectable()
export class VotesDataProviderService extends GenericCrudDataProvider<RoomVotes>
  implements IGenericCrudDataProvider<RoomVotes> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'room-votes');
  }
}
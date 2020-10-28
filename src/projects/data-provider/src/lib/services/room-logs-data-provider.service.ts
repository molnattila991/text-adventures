import { Inject, Injectable } from '@angular/core';
import { IGenericCrudDataProvider, GenericCrudService, MultiGameLogs } from '@text-adventures/shared';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';


@Injectable()
export class RoomLogsDataProviderService extends GenericCrudDataProvider<MultiGameLogs>
  implements IGenericCrudDataProvider<MultiGameLogs> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'room-logs');
  }
}
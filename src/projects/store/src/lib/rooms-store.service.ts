import { Inject, Injectable } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomModel } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class RoomsStoreService extends BaseDataCollectionStore<RoomModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) store: IGenericCrudDataProvider<RoomModel>) {
    super(store, { selectProperty: "name" });
  }
}
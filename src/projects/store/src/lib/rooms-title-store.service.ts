import { Inject, Injectable } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomTitleModel } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class RoomsTitleStoreService extends BaseDataCollectionStore<RoomTitleModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsTitleDataProviderService) store: IGenericCrudDataProvider<RoomTitleModel>) {
    super(store, { selectProperty: "name" });
  }
}
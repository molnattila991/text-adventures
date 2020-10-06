import { Inject, Injectable } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, ItemModel } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class ItemStoreService extends BaseDataCollectionStore<ItemModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.ItemsDataProviderService) store: IGenericCrudDataProvider<ItemModel>) {
    super(store, { selectProperty: "name" });
  }
}

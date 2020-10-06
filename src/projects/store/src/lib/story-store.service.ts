import { Inject, Injectable } from '@angular/core';
import { StoryModel, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class StoryStoreService extends BaseDataCollectionStore<StoryModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.StoryDataProviderService) store: IGenericCrudDataProvider<StoryModel>) {
    super(store, { selectProperty: "name" });
  }
}
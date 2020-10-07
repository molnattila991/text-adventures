import { Inject, Injectable } from '@angular/core';
import { DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, AbilityModel } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class AbilityStoreService extends BaseDataCollectionStore<AbilityModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.AbilitiesDataProviderService) store: IGenericCrudDataProvider<AbilityModel>) {
    super(store, { selectProperty: "name" });
  }
}
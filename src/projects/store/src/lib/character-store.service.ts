import { Inject, Injectable } from '@angular/core';
import { CharacterModel, IGenericCrudDataProvider, DATA_PROVIDER_INJECTION_TOKEN } from '@text-adventures/shared';
import { BaseDataCollectionStore } from './base-data-collection-store.class';

@Injectable()
export class CharacterStoreService extends BaseDataCollectionStore<CharacterModel>{
  constructor(@Inject(DATA_PROVIDER_INJECTION_TOKEN.CharactersDataProviderService) store: IGenericCrudDataProvider<CharacterModel>) {
    super(store, { selectProperty: "name" });
  }
}
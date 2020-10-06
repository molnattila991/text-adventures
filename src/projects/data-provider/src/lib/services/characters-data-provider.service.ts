import { GenericCrudDataProvider } from './../helper/generic-crud-data-provider.class';
import { Injectable, Inject } from '@angular/core';
import { CharacterModel, IGenericCrudDataProvider, GenericCrudService } from '@text-adventures/shared';


@Injectable()
export class CharactersDataProviderService
  extends GenericCrudDataProvider<CharacterModel>
  implements IGenericCrudDataProvider<CharacterModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'characters');
  }
}

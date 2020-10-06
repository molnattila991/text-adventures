import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';
import { Injectable, Inject } from '@angular/core';
import { CharacterPlayerModel, IGenericCrudDataProvider, GenericCrudService } from '@text-adventures/shared';

@Injectable()
export class UserCharactersDataProviderService
  extends GenericCrudDataProvider<CharacterPlayerModel>
  implements IGenericCrudDataProvider<CharacterPlayerModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'user-characters');
  }
}

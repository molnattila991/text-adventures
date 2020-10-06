import {
  GenericCrudDataProvider,
} from './../helper/generic-crud-data-provider.class';
import { Injectable, Inject } from '@angular/core';
import { GenericCrudService, IGenericCrudDataProvider, AbilityModel } from '@text-adventures/shared';

@Injectable()
export class AbilitiesDataProviderService
  extends GenericCrudDataProvider<AbilityModel>
  implements IGenericCrudDataProvider<AbilityModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'abilities');
  }
}

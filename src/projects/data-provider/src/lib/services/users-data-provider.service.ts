import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';
import { Injectable, Inject } from '@angular/core';
import { IGenericCrudDataProvider, GenericCrudService, UserModel } from '@text-adventures/shared';


@Injectable()
export class UsersDataProviderService
  extends GenericCrudDataProvider<UserModel>
  implements IGenericCrudDataProvider<UserModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'users');
  }
}

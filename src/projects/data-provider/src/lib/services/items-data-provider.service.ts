import {
  GenericCrudDataProvider,
} from './../helper/generic-crud-data-provider.class';
import { Injectable, Inject } from '@angular/core';
import { ItemModel, IGenericCrudDataProvider, GenericCrudService } from '@text-adventures/shared';

@Injectable()
export class ItemsDataProviderService
  extends GenericCrudDataProvider<ItemModel>
  implements IGenericCrudDataProvider<ItemModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'items');
  }
}

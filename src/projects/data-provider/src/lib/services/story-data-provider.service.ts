import { Injectable, Inject } from '@angular/core';
import { StoryModel, IGenericCrudDataProvider, GenericCrudService } from '@text-adventures/shared';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';

@Injectable()
export class StoryDataProviderService
  extends GenericCrudDataProvider<StoryModel>
  implements IGenericCrudDataProvider<StoryModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'stories');
  }
}

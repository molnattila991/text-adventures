import { Injectable, Inject } from '@angular/core';
import { GenericCrudDataProvider } from '../helper/generic-crud-data-provider.class';
import { IGenericCrudDataProvider, GenericCrudService, StoryPageModel } from '@text-adventures/shared';

@Injectable()
export class StoryPageDataProviderService
  extends GenericCrudDataProvider<StoryPageModel>
  implements IGenericCrudDataProvider<StoryPageModel> {
  constructor(
    @Inject('FirestoreBaseService') protected crudService: GenericCrudService
  ) {
    super(crudService, 'storyItems');
  }
}

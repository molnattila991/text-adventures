import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsDataProviderService } from '../services/items-data-provider.service';
import { AbilitiesDataProviderService } from '../services/abilities-data-provider.service';
import { StoryDataProviderService } from '../services/story-data-provider.service';
import { CharactersDataProviderService } from '../services/characters-data-provider.service';
import { StoryPageDataProviderService } from '../services/story-data-page-provider.service';
import { RoomsDataProviderService } from '../services/room-data-provider.service';
import { RoomsTitleDataProviderService } from '../services/room-title-data-provider.service';
import { UsersDataProviderService } from '../services/users-data-provider.service';
import { UserCharactersDataProviderService } from '../services/user-characters-data-provider.service';
import { FirebaseProvidersModule } from '@text-adventures/firestore-be';
import { DATA_PROVIDER_INJECTION_TOKEN } from '@text-adventures/shared';

@NgModule({
  imports: [CommonModule, FirebaseProvidersModule],
  providers: [
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.ItemsDataProviderService,
      useClass: ItemsDataProviderService
    },
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.AbilitiesDataProviderService,
      useClass: AbilitiesDataProviderService
    },
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.StoryDataProviderService,
      useClass: StoryDataProviderService
    },
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.StoryPageDataProviderService,
      useClass: StoryPageDataProviderService
    },
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.CharactersDataProviderService,
      useClass: CharactersDataProviderService
    },
    {
      provide: 'RoomsDataProviderService',
      useClass: RoomsDataProviderService
    },
    {
      provide: 'RoomsTitleDataProviderService',
      useClass: RoomsTitleDataProviderService
    },
    {
      provide: DATA_PROVIDER_INJECTION_TOKEN.UsersDataProviderService,
      useClass: UsersDataProviderService
    },
    {
      provide: 'UserCharactersDataProviderService',
      useClass: UserCharactersDataProviderService
    }
  ]
})
export class DataProviderProvidersModule { }

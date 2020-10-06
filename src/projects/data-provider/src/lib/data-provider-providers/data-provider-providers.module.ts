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

@NgModule({
  imports: [CommonModule, FirebaseProvidersModule],
  providers: [
    {
      provide: 'ItemsDataProviderService',
      useClass: ItemsDataProviderService
    },
    {
      provide: 'AbilitiesDataProviderService',
      useClass: AbilitiesDataProviderService
    },
    {
      provide: 'StoryDataProviderService',
      useClass: StoryDataProviderService
    },
    {
      provide: 'StoryPageDataProviderService',
      useClass: StoryPageDataProviderService
    },
    {
      provide: 'CharactersDataProviderService',
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
      provide: 'UsersDataProviderService',
      useClass: UsersDataProviderService
    },
    {
      provide: 'UserCharactersDataProviderService',
      useClass: UserCharactersDataProviderService
    }
  ]
})
export class DataProviderProvidersModule { }

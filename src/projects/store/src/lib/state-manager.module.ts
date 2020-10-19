import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemStoreService } from './item-store.service';
import { AbilityStoreService } from './ability-store.service';
import { CharacterStoreService } from './character-store.service';
import { StoryStoreService } from './story-store.service';
import { STORE_INJECTION_TOKEN } from '@text-adventures/shared';
import { RoomsStoreService } from './rooms-store.service';
import { RoomsTitleStoreService } from './rooms-title-store.service';


@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: STORE_INJECTION_TOKEN.ItemStoreService, useClass: ItemStoreService },
    { provide: STORE_INJECTION_TOKEN.AbilityStoreService, useClass: AbilityStoreService },
    { provide: STORE_INJECTION_TOKEN.CharacterStoreService, useClass: CharacterStoreService },
    { provide: STORE_INJECTION_TOKEN.StoryStoreService, useClass: StoryStoreService },
    { provide: STORE_INJECTION_TOKEN.RoomsStoreService, useClass: RoomsStoreService },
    { provide: STORE_INJECTION_TOKEN.RoomsTitleStoreService, useClass: RoomsTitleStoreService },
  ]
})
export class StateManagerModule { }

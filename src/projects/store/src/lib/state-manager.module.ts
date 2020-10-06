import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemStoreService } from './item-store.service';
import { AbilityStoreService } from './ability-store.service';
import { CharacterStoreService } from './character-store.service';
import { StoryStoreService } from './story-store.service';


@NgModule({
  imports: [CommonModule],
  providers: [ItemStoreService, AbilityStoreService, CharacterStoreService, StoryStoreService]
})
export class StateManagerModule { }

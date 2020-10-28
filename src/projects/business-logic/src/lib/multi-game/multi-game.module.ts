import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { CreateRoomService } from './room/create-room.service';
import { SelectedRoomService } from './room/selected-room.service';
import { SelectedCharactersService } from './characters/selected-characters.service';
import { CharactersInRoomService } from './characters/characters-in-room.service';
import { MultiCommandHandlerService } from './game/multi-command-handler.service';
import { MultiCommandHelperService } from './game/multi-command-helper.service';
import { MultiCommandManagerGameService } from './game/handlers/multi-command-manager-game.service';
import { SelectedRoomVotesService } from './room/selected-room-votes.service';
import { MultiGameStateService } from './game/state/multi-game-state.service';
import { CharacterSelectorService } from './game/host/character-selector.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateRoomService, useClass: CreateRoomService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService, useClass: SelectedRoomService },
    SelectedCharactersService,
    CharactersInRoomService,
    MultiCommandHelperService,
    MultiCommandHandlerService,
    MultiCommandManagerGameService,
    SelectedRoomVotesService,
    MultiGameStateService,
    CharacterSelectorService,
    MultiGameStateService

  ]
})
export class MultiGameModule {
  constructor(
    private charactersInRoomService: CharactersInRoomService,
  ) { }
}

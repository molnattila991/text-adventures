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
import { NextPlayerSelectorService } from './game/host/next-player-selector.service';
import { AppTypeService } from './game/host/app-type.service';
import { MultiGameHostService } from './game/host/multi-game-host.service';
import { MultiGameRoundManagerService } from './game/host/multi-game-round-manager.service';
import { MultiGameLoggingService } from './logging/multi-game-logging.service';
import { MultiGameLogCollectorService } from './logging/multi-game-log-collector.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateRoomService, useClass: CreateRoomService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService, useClass: SelectedRoomService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.MultiGameLoggingService, useClass: MultiGameLoggingService },
    SelectedCharactersService,
    CharactersInRoomService,
    MultiCommandHelperService,
    MultiCommandHandlerService,
    MultiCommandManagerGameService,
    SelectedRoomVotesService,
    MultiGameStateService,
    NextPlayerSelectorService,
    AppTypeService,
    MultiGameStateService,
    MultiGameHostService,
    MultiGameRoundManagerService,
    MultiGameLogCollectorService
  ]
})
export class MultiGameModule {
  constructor(
    private charactersInRoomService: CharactersInRoomService,
    private characterSelectorService: NextPlayerSelectorService,
    private multiGameStateService: MultiGameStateService,
    private multiGameHostService: MultiGameHostService,
    private multiGameLogCollectorService: MultiGameLogCollectorService
  ) { }
}

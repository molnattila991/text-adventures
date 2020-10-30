import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite } from '@text-adventures/shared';
import { NextPlayerSelectorService } from '../game/host/next-player-selector.service';
import { MultiGameStateService } from '../game/state/multi-game-state.service';

@Injectable()
export class MultiGameLogCollectorService {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.MultiGameLoggingService) private writeLogService: CommandOutputWrite,

    private nextPlayerSelectorService: NextPlayerSelectorService,
    private multiGameStateService: MultiGameStateService

  ) {
    this.nextPlayerSelectorService.getActualPlayer().subscribe(v => {
      this.writeLogService.pushText([`Következő játékost: ${v}`]);
    });

    this.multiGameStateService.getTurnAndRound().subscribe(v => {
      this.writeLogService.pushText([`Kör: ${v.round}`]);
      this.writeLogService.pushText([`Forduló: ${v.turn}`]);
    });
  }
}

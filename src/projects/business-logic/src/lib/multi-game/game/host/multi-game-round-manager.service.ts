import { Injectable } from '@angular/core';
import { MultiGameState } from '@text-adventures/shared';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CharactersInRoomService } from '../../characters/characters-in-room.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { NextPlayerSelectorService } from './next-player-selector.service';


@Injectable()
export class MultiGameRoundManagerService {
  private next$: Subject<void> = new Subject();
  constructor(
    private charactersInRoomService: CharactersInRoomService,
    private multiGameStateService: MultiGameStateService,
    private nextPlayerSelectorService: NextPlayerSelectorService
  ) {
    this.next$.pipe(
      withLatestFrom(
        this.charactersInRoomService.getActivePlayersNumber(),
        this.nextPlayerSelectorService.getAvaiableNextPlayers(),
        this.charactersInRoomService.getActiveTeamsCount()
      )
    ).subscribe(([action, activePlayersNumber, avaiableNextPlayers, activeTeamNumbers]) => {
      console.log("End of turn: ", activePlayersNumber, avaiableNextPlayers, activeTeamNumbers);
      if (activeTeamNumbers > 1) {
        if (avaiableNextPlayers >= 1) {
          // this.multiGameStateService.setState(MultiGameState.newTurn);
        } else {
          // this.multiGameStateService.setState(MultiGameState.newRound);
        }
      } else {
        this.multiGameStateService.setState(MultiGameState.ended);
      }
    });
  }

  next(): void {
    this.next$.next();
  }
}

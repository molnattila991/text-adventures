import { Injectable } from '@angular/core';
import { MultiGameState } from '@text-adventures/shared';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CharactersInRoomService } from '../../characters/characters-in-room.service';
import { SelectedRoomVotesService } from '../../room/selected-room-votes.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { NextPlayerSelectorService } from './next-player-selector.service';


@Injectable()
export class MultiGameRoundManagerService {
  private next$: Subject<void> = new Subject();
  constructor(
    private charactersInRoomService: CharactersInRoomService,
    private multiGameStateService: MultiGameStateService,
    private nextPlayerSelectorService: NextPlayerSelectorService,
    private selectedRoomVotesService: SelectedRoomVotesService

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
          this.multiGameStateService.incrementTurnNumber();
        } else {
          this.nextPlayerSelectorService.reset();
          this.multiGameStateService.incrementRoundNumber()
        }

        this.selectedRoomVotesService.resetVotes();
        this.nextPlayerSelectorService.selectNextPlayer();
      } else {
        this.multiGameStateService.setState(MultiGameState.ended);
      }
    });
  }

  next(): void {
    this.next$.next();
  }
}

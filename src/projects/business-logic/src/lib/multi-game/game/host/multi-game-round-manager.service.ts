import { Injectable } from '@angular/core';
import { CharacterSelectorService } from './character-selector.service';
import { combineLatest } from 'rxjs';
import { CharactersInRoomService } from '../../characters/characters-in-room.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { take, withLatestFrom } from 'rxjs/operators';
import { MultiGameState } from '@text-adventures/shared';

@Injectable()
export class MultiGameRoundManagerService {

  constructor(
    private characterSelectorService: CharacterSelectorService,
    private charactersInRoomService: CharactersInRoomService,
    private multiGameStateService: MultiGameStateService
  ) {
  }

  next(): void {
    combineLatest([
      this.characterSelectorService.getActivePlayersNumber(),
      this.characterSelectorService.getAvaiableNextPlayers(),
      this.charactersInRoomService.getActiveTeamsCount()
    ]).pipe(
      take(1),
      withLatestFrom(this.multiGameStateService.getRoundNumber())
    ).subscribe(([[activePlayersNumber, avaiableNextPlayers, activeTeamNumbers], roundNumber]) => {
      console.log("End of turn: ", activePlayersNumber, avaiableNextPlayers, activeTeamNumbers, roundNumber);
      if (activeTeamNumbers > 1) {
        if (avaiableNextPlayers >= 1) {
          this.multiGameStateService.setState(MultiGameState.newTurn);
        } else {
          this.multiGameStateService.setState(MultiGameState.newRound);
        }
      } else {
        this.multiGameStateService.setState(MultiGameState.ended);
      }
    });
  }
}

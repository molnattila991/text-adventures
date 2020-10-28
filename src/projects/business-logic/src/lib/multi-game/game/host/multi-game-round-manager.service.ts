import { Injectable } from '@angular/core';
import { CharacterSelectorService } from './character-selector.service';
import { combineLatest, Subject } from 'rxjs';
import { CharactersInRoomService } from '../../characters/characters-in-room.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { take, withLatestFrom } from 'rxjs/operators';
import { MultiGameState } from '@text-adventures/shared';

@Injectable()
export class MultiGameRoundManagerService {
  private next$: Subject<void> = new Subject();
  constructor(
    private characterSelectorService: CharacterSelectorService,
    private charactersInRoomService: CharactersInRoomService,
    private multiGameStateService: MultiGameStateService
  ) {
    this.next$.pipe(
      withLatestFrom(
        this.characterSelectorService.getActivePlayersNumber(),
        this.characterSelectorService.getAvaiableNextPlayers(),
        this.charactersInRoomService.getActiveTeamsCount()
      )
    ).subscribe(([action, activePlayersNumber, avaiableNextPlayers, activeTeamNumbers]) => {
      console.log("End of turn: ", activePlayersNumber, avaiableNextPlayers, activeTeamNumbers);
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

  next(): void {
    this.next$.next();
  }
}

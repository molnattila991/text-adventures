import { Injectable } from '@angular/core';
import { MultiGameState } from '@text-adventures/shared';
import { pipe } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectedRoomVotesService } from '../../room/selected-room-votes.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { AppTypeService } from './app-type.service';

@Injectable()
export class MultiGameHostService {

  constructor(
    private appTypeService: AppTypeService,
    private multiGameStateService: MultiGameStateService,
    private selectedRoomVotesService: SelectedRoomVotesService
  ) {
    this.selectedRoomVotesService.resetVotes();

    this.appTypeService.isHost().pipe(
      //distinctUntilChanged((a, b) => a == b),
      switchMap(() => this.selectedRoomVotesService.getStatus()
        .pipe(
          distinctUntilChanged((a, b) => a.votes == b.votes),
          filter(a => a.membersNumber > 0 && a.membersNumber == a.votes),
          withLatestFrom(this.multiGameStateService.getState())
        ))

    ).subscribe(([roomVotes, gameState]) => {
      console.log("VOTE:", gameState, roomVotes);

      switch (gameState) {
        case MultiGameState.waitForStart:
          this.multiGameStateService.setState(MultiGameState.started);
          break;
        case MultiGameState.waitForVote:

          break;
      }
    });


    this.appTypeService.isHost().pipe(
      //distinctUntilChanged((a, b) => a == b),
      switchMap(() => this.multiGameStateService.getState()),
      distinctUntilChanged((a, b) => a == b)
    ).subscribe(state => {
      switch (state) {
        case MultiGameState.started:
          alert("A járék elkezdődött.");
          
          break;
        case MultiGameState.newTurn:
          break;
        case MultiGameState.default:
          break;
        case MultiGameState.ended:
          console.log("ENDED");
          alert("Vége a harcnak")
          break;
      }
    })


  }
}

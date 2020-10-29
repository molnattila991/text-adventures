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

    this.appTypeService.ifHost().pipe(
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
          console.log("waitForStart")
          this.multiGameStateService.setState(MultiGameState.started);
          break;
        case MultiGameState.waitForVote:
          console.log("waitForVote")
          break;
      }
    });


    this.appTypeService.ifHost().pipe(
      switchMap(() => this.multiGameStateService.getState()),
      distinctUntilChanged((a, b) => a == b)
    ).subscribe(state => {
      switch (state) {
        case MultiGameState.started:
          console.log("started")
          alert("A játék elkezdődött.");

          break;
        case MultiGameState.newTurn:
          console.log("newTurn")
          break;
        case MultiGameState.default:
          console.log("default")
          break;
        case MultiGameState.ended:
          console.log("ended")
          alert("Vége a harcnak")
          break;
      }
    })
  }
}

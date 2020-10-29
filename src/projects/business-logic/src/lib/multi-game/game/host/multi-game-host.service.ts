import { Injectable } from '@angular/core';
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
      distinctUntilChanged((a, b) => a == b),
      pipe(
        switchMap(() => this.selectedRoomVotesService.getStatus()
          .pipe(
            distinctUntilChanged((a, b) => a.votes == b.votes),
            filter(a => a.membersNumber > 0 && a.membersNumber == a.votes),
            withLatestFrom(this.multiGameStateService.getState())
          ))
      )
    ).subscribe(([roomVotes, gameState]) => {
      console.log(gameState);
      console.log(roomVotes);
    });




  }
}

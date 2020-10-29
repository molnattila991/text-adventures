import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
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

    this.appTypeService.isHost().pipe(
      distinctUntilChanged((a, b) => a == b),
      pipe(
        switchMap(() => this.selectedRoomVotesService.getSelectedItem()),
        distinctUntilChanged((a, b) => a.votes.length == b.votes.length)
      )
    ).subscribe(roomVotes => {
      console.log(roomVotes);
    })

  }
}

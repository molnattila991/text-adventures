import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, RoomModel, CommandOutput, CommandOutputMessage } from '@text-adventures/shared';
import { ReplaySubject, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ISelectedItemService } from '../../selected-item/selected-item-service';
import { SelectedRoomVotesService } from '../room/selected-room-votes.service';
import { MultiGameState, MultiGameStateService } from './multi-game-state.service';
import { MultiGameLoggerService } from './logger/multi-game-logger.service';

@Injectable()
export class MultiGameHostService {
  private appIsHost$: ReplaySubject<boolean> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>,
    private selectedRoomVotesService: SelectedRoomVotesService,
    private multiGameStateService: MultiGameStateService,
    private multiGameLoggerService: MultiGameLoggerService
  ) {
    combineLatest([
      this.loggedInUser.getLoggedInUser(),
      this.selectedRoomService.getSelectedItem()
    ]).pipe(
      map(([user, room]) => room.hostPlayerID == user.id)
    ).subscribe(this.appIsHost$);


    combineLatest([
      this.appIsHost$,
      this.selectedRoomVotesService.getStatus(),
      this.multiGameStateService.getState()
    ]).pipe(
      filter(([isHost, room, state]) => isHost == true)
    ).subscribe(([isHost, room, state]) => {
      switch (state) {
        case MultiGameState.started:
          //Select first player
          //Init game
          //Logok megosztása.
          this.multiGameLoggerService.push([]);
          this.multiGameLoggerService.flush();
          break;
        case MultiGameState.newRoundStarted:
          break;
        case MultiGameState.newPlayerStarted:
          break;
        case MultiGameState.waitForStart:
          if (room.membersNumber == room.votes) {
            //start állapot
          }
          break;
        case MultiGameState.waitForVote:
          if (room.membersNumber == room.votes) {
            //next player
            //körök kezelése
            //logolás
          }
          break;
      }
    });
  }
}

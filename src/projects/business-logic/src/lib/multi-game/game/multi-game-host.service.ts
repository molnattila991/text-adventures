import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, RoomModel } from '@text-adventures/shared';
import { ReplaySubject, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ISelectedItemService } from '../../selected-item/selected-item-service';
import { SelectedRoomVotesService } from '../room/selected-room-votes.service';
import { MultiGameState, MultiGameStateService } from './multi-game-state.service';

@Injectable()
export class MultiGameHostService {
  private appIsHost$: ReplaySubject<boolean> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>,
    private selectedRoomVotesService: SelectedRoomVotesService,
    private multiGameStateService: MultiGameStateService
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
          break;
        case MultiGameState.waitForStart:
          if (room.activeMembersNumber == room.votes) {
            //start állapot
          }
          break;
        case MultiGameState.waitForVote:
          if (room.activeMembersNumber == room.votes) {
            //next player
            //körök kezelése
            //logolás
          }
          break;
      }
    });
  }
}

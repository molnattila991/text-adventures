import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, RoomModel, CommandOutput, CommandOutputMessage, MultiGameState } from '@text-adventures/shared';
import { ReplaySubject, combineLatest } from 'rxjs';
import { map, filter, withLatestFrom, pairwise } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';
import { SelectedRoomVotesService } from '../../room/selected-room-votes.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { MultiGameLoggerService } from '../logger/multi-game-logger.service';
import { CharacterSelectorService } from './character-selector.service';
import { MultiGameRoundManagerService } from './multi-game-round-manager.service';
import { MultiGameHostStateManagerService } from './multi-game-host-state-manager.service';

@Injectable()
export class MultiGameHostService {
  private appIsHost$: ReplaySubject<boolean> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>,
    private selectedRoomVotesService: SelectedRoomVotesService,
    private multiGameStateService: MultiGameStateService,
    private multiGameLoggerService: MultiGameLoggerService,
    private multiGameHostStateManagerService: MultiGameHostStateManagerService
  ) {
    combineLatest([
      this.loggedInUser.getLoggedInUser(),
      this.selectedRoomService.getSelectedItem()
    ]).pipe(
      map(([user, room]) => room.hostPlayerID == user.id)
    ).subscribe(this.appIsHost$);

    this.selectedRoomVotesService.getStatus()
      .pipe(
        withLatestFrom(
          this.appIsHost$,
          this.multiGameStateService.getState()
        ),
        filter(([votes, appIsHost, state]) => appIsHost == true)
      ).subscribe(([votes, appIsHost, state]) => {
        switch (state) {
          case MultiGameState.waitForStart:
            this.multiGameHostStateManagerService.waitForStart(votes);
            break;

          case MultiGameState.waitForVote:
            this.multiGameHostStateManagerService.waitForVote(votes);
            break;
        }
      });

    this.multiGameStateService.getState()
      .pipe(
        // pairwise(),
        withLatestFrom(this.appIsHost$),
        // filter(([[prev, curr], appIsHost]) => prev != curr && appIsHost == true)
        filter(([state, appIsHost]) => appIsHost == true)

        // ).subscribe(([[prev, state]]) => {
      ).subscribe(([state]) => {

        switch (state) {
          case MultiGameState.default:
            this.multiGameHostStateManagerService.default();
            break;

          case MultiGameState.started:
            this.multiGameHostStateManagerService.started();
            break;

          case MultiGameState.newRound:
            this.multiGameHostStateManagerService.newRound();
            break;

          case MultiGameState.newTurn:
            this.multiGameHostStateManagerService.newTurn();
            break;

          case MultiGameState.ended:
            this.multiGameHostStateManagerService.ended();
            break;
        }
      });
  }
}

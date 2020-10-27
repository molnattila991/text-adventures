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

@Injectable()
export class MultiGameHostService {
  private appIsHost$: ReplaySubject<boolean> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>,
    private selectedRoomVotesService: SelectedRoomVotesService,
    private multiGameStateService: MultiGameStateService,
    private multiGameLoggerService: MultiGameLoggerService,
    private characterSelectorService: CharacterSelectorService,
    private multiGameRoundManagerService: MultiGameRoundManagerService
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
            console.log("waitForStart");
            if (votes.membersNumber > 1 && votes.membersNumber == votes.votes) {
              console.log("TODO: if (votes.membersNumber > 1 && votes.membersNumber == votes.votes)")
              //start állapot
              console.log("waitForStart in");
              this.selectedRoomVotesService.resetVotes();
              //new round if required
              this.multiGameStateService.setState(MultiGameState.started);
            }
            break;

          case MultiGameState.waitForVote:
            console.log("waitForVote");
            if (votes.membersNumber > 1 && votes.membersNumber == votes.votes) {
              console.log("TODO: if (votes.membersNumber > 1 && votes.membersNumber == votes.votes)")

              console.log("waitForVote in");
              //next player
              //körök kezelése
              //logolás
              this.selectedRoomVotesService.resetVotes();
              this.multiGameRoundManagerService.next();
            }
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
            this.multiGameStateService.setState(MultiGameState.waitForStart);
            break;

          case MultiGameState.started:
            console.log("started");
            //Init game
            //Logok megosztása.
            // this.multiGameLoggerService.push([]);
            // this.multiGameLoggerService.flush();
            this.selectedRoomVotesService.resetVotes();
            this.multiGameStateService.setState(MultiGameState.newRound);
            break;

          case MultiGameState.newRound:
            //Új kör
            console.log("newRound");
            this.characterSelectorService.reset();
            this.multiGameStateService.incrementRoundNumber();
            this.multiGameStateService.setState(MultiGameState.newTurn);
            break;

          case MultiGameState.newTurn:
            console.log("newTurn")
            // this.characterSelectorService.playerFinishRound();
            this.characterSelectorService.selectNextPlayer();
            this.multiGameStateService.setState(MultiGameState.waitForVote);
            break;

          case MultiGameState.ended:
            console.log("ended");
            break;
        }
      });

  }
}

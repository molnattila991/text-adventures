import { Injectable } from '@angular/core';
import { MultiGameState } from '@text-adventures/shared';
import { MultiTeamStatus, SelectedRoomVotesService } from '../../room/selected-room-votes.service';
import { MultiGameStateService } from '../state/multi-game-state.service';
import { CharacterSelectorService } from './character-selector.service';
import { MultiGameRoundManagerService } from './multi-game-round-manager.service';

@Injectable()
export class MultiGameHostStateManagerService {

  constructor(
    private selectedRoomVotesService: SelectedRoomVotesService,
    private multiGameStateService: MultiGameStateService,
    private multiGameRoundManagerService: MultiGameRoundManagerService,
    private characterSelectorService: CharacterSelectorService
  ) { }

  waitForStart(votes: MultiTeamStatus): void {
    console.log("waitForStart");
    if (votes.membersNumber > 1 && votes.membersNumber == votes.votes) {
      console.log("TODO: if (votes.membersNumber > 1 && votes.membersNumber == votes.votes)")
      //start állapot
      console.log("waitForStart in");
      this.selectedRoomVotesService.resetVotes();
      //new round if required
      this.multiGameStateService.setState(MultiGameState.started);
    }
  }

  waitForVote(votes: MultiTeamStatus): void {
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
  }

  default(): void {
    this.multiGameStateService.setState(MultiGameState.waitForStart);
  }

  started(): void {
    console.log("started");
    //Init game
    //Logok megosztása.
    // this.multiGameLoggerService.push([]);
    // this.multiGameLoggerService.flush();
    this.selectedRoomVotesService.resetVotes();
    this.multiGameStateService.setState(MultiGameState.newRound);
  }

  newRound(): void {
    //Új kör
    console.log("newRound");
    this.characterSelectorService.reset();
    this.multiGameStateService.incrementRoundNumber();
    this.multiGameStateService.setState(MultiGameState.newTurn);
  }

  newTurn(): void {
    console.log("newTurn")
    // this.characterSelectorService.playerFinishRound();
    this.characterSelectorService.selectNextPlayer();
    this.multiGameStateService.setState(MultiGameState.waitForVote);
  }

  ended(): void {
    console.log("ended");
  }
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export enum MultiGameState {
  waitForStart,
  started,
  newPlayerStarted,
  newRoundStarted,
  waitForVote,
  ended
}

@Injectable()
export class MultiGameStateService {
  private gameState$: ReplaySubject<MultiGameState> = new ReplaySubject();
  constructor() {
    this.gameState$.next(MultiGameState.waitForStart);
  }

  async setState(state: MultiGameState): Promise<void> {
    this.gameState$.next(state);
  }

  getState(): Observable<MultiGameState> {
    return this.gameState$.asObservable();
  }
}

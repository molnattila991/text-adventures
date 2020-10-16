import { Injectable } from '@angular/core';
import { BattleService } from '../story-management/battle.service';
import { StoryStateService } from '../story-management/story-state.service';
import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { CharacterModelExpanded, HashMap, PropertyType } from '@text-adventures/shared';
import { filter, flatMap, map, withLatestFrom } from 'rxjs/operators';
import { SinglePlayerBattlePlayerManagerService } from './single-player-battle-player-manager.service';

export interface Vote {
  playerId: string | number;
  value: boolean;
}

@Injectable()
export class SinglePlayerBattleTeamManagerService {
  private votes$: ReplaySubject<HashMap<Vote>> = new ReplaySubject();
  private votesCount$: ReplaySubject<number> = new ReplaySubject();
  private vote$: Subject<number> = new Subject();
  private startNewRound$: Subject<void> = new Subject();
  private startBattle$: Subject<void> = new Subject();
  constructor(
    private storyStateService: StoryStateService,
    private singlePlayerBattlePlayerManagerService: SinglePlayerBattlePlayerManagerService
  ) {
    this.vote$
      .pipe(withLatestFrom(this.votes$))
      .subscribe(([palyerId, votes]) => {
        const v = votes[palyerId];
        if (v) {
          votes[palyerId] = <Vote>{ playerId: palyerId, value: true };
        }
      });

    this.votes$.pipe(map(v => Object.keys(v).length)).subscribe(this.votesCount$)



    combineLatest([this.votesCount$, this.singlePlayerBattlePlayerManagerService.getActivePlayersNumber()])
      .pipe(filter(([votes, playersCount]) => votes >= playersCount))
      .subscribe(v => this.startNewRound$.next());

    this.startBattle$.subscribe(v => {
      this.startNewRound$.next();
    })

    this.startNewRound$.subscribe(() => {
      this.votes$.next({})
      this.singlePlayerBattlePlayerManagerService.newRound();
    });
  }

  vote(playerIndex: number): void {
    this.vote$.next(playerIndex);
  }

  startBattle(): void {
    this.startBattle$.next();
  }
}

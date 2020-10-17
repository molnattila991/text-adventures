import { Injectable } from '@angular/core';
import { CharacterModelExpanded, PropertyType } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { BattleService } from '../story-management/battle.service';

@Injectable()
export class SinglePlayerBattlePlayerManagerService {
  private currentPlayer$: ReplaySubject<CharacterModelExpanded> = new ReplaySubject();
  private avaiableNextPlayers$: ReplaySubject<CharacterModelExpanded[]> = new ReplaySubject();
  private activePlayers$: ReplaySubject<CharacterModelExpanded[]> = new ReplaySubject();
  private nextPlayer$: Subject<void> = new Subject();
  private finishedPlayers$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  private activePlayersNumber$: ReplaySubject<number> = new ReplaySubject();
  private newRound$: Subject<void> = new Subject();

  constructor(
    private battleService: BattleService,
  ) {
    this.battleService.getTeams().pipe(
      map(teams => teams.map(t => {
        return t.teamMembers.filter(m => m.attributes[PropertyType.actLife].value >= 0)
      }).reduce((acc, x) => acc.concat(...x), [])
      )
    ).subscribe(this.activePlayers$);

    combineLatest([this.activePlayers$, this.finishedPlayers$])
      .pipe(
        map(([activePlayers, finishedPlayers]) =>
          activePlayers.filter(ap => finishedPlayers.find(f => f == ap.index) == undefined)
        )
      ).subscribe(v => {
        console.log(v)
        this.avaiableNextPlayers$.next(v);
      });

    this.activePlayers$
      .pipe(withLatestFrom(this.finishedPlayers$))
      .subscribe(([activePlayers, finished]) => {
        const finishedPlayers = finished.filter(f => activePlayers.find(a => a.index == f) != undefined);
        this.finishedPlayers$.next(finishedPlayers);
      })

    this.activePlayers$.pipe(map(p => p.length)).subscribe(this.activePlayersNumber$);

    this.newRound$
      .pipe(
        withLatestFrom(
          this.finishedPlayers$,
          this.activePlayersNumber$
        ),
        map(([action, finishedPlayers, activePlayersNumber]) => {
          if (finishedPlayers.length >= activePlayersNumber) {
            return true;
          } else {
            return false;
          }
        })
      )
      .subscribe(v => {
        if (v) {
          this.finishedPlayers$.next([]);
          this.nextPlayer$.next();
        } else {
          this.nextPlayer$.next();
        }
      });

    this.nextPlayer$.pipe(
      withLatestFrom(
        this.avaiableNextPlayers$,
        this.finishedPlayers$
      )
    ).subscribe(([action, avaiableNextPlayers, finishedPlayerIndexes]) => {
      const nextPlayer = avaiableNextPlayers[Math.floor(Math.random() * avaiableNextPlayers.length)];

      finishedPlayerIndexes.push(...finishedPlayerIndexes);
      finishedPlayerIndexes.push(nextPlayer.index);

      this.finishedPlayers$.next(finishedPlayerIndexes);
      this.currentPlayer$.next(nextPlayer);
    });
  }

  getActivePlayersNumber(): Observable<number> {
    return this.activePlayersNumber$.asObservable()
  }

  getActivePlayers(): Observable<CharacterModelExpanded[]> {
    return this.activePlayers$.asObservable();
  }

  getCurrentPlayer(): Observable<CharacterModelExpanded> {
    return this.currentPlayer$.asObservable();
  }

  newRound(): void {
    this.newRound$.next();
  }
}

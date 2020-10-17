import { Inject, Injectable, Output } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterModelExpanded, CommandOutputWrite, PropertyType } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { BattleService } from '../story-management/battle.service';
import { StoryState } from '../story-management/story-state.service';

enum BattleRoundState { NextPlayer, NextRound, EndBattle };

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
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,

  ) {
    this.battleService.getTeams().pipe(
      map(teams => teams.map(t => {
        return t.teamMembers.filter(m => m.attributes[PropertyType.actLife].value >= 0)
      }).reduce((acc, x) => acc.concat(...x), [])
      )
    ).subscribe(v => {
      this.activePlayers$.next(v);
    });

    combineLatest([this.activePlayers$, this.finishedPlayers$])
      .pipe(
        map(([activePlayers, finishedPlayers]) =>
          activePlayers.filter(ap => finishedPlayers.find(f => f == ap.index) == undefined)
        )
      ).subscribe(v => {
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
          if (activePlayersNumber > 1) {
            if (finishedPlayers.length >= activePlayersNumber) {
              return BattleRoundState.NextRound;
            } else {
              return BattleRoundState.NextPlayer;
            }
          } else {
            return BattleRoundState.EndBattle;
          }
        })
      )
      .subscribe(v => {
        console.log(v);
        switch (v) {
          case BattleRoundState.NextPlayer:
            this.nextPlayer$.next();
            break;
          case BattleRoundState.NextRound:
            this.finishedPlayers$.next([]);
            this.nextPlayer$.next();
            break;
          case BattleRoundState.EndBattle:
            break;
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

    this.activePlayers$.pipe(
      withLatestFrom(this.battleService.getPlayerIndex()),
      map(([players, index]) => {
        const player = players.find(p => p.index == index);
        if (players.length == 1 && player) {
          return StoryState.WinBattle
        } else if (players.length > 0 && player == undefined) {
          return StoryState.LostBattle;
        } else {
          return undefined;
        }
      })
    ).subscribe(state => {
      switch (state) {
        case StoryState.LostBattle:
          this.output.pushText(["Veszítettél, üsd be a 'battle end' parancsot."]);
          break;
        case StoryState.LostBattle:
          this.output.pushText(["Nyertél, üsd be a 'battle end' parancsot."]);
          break;
      }
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

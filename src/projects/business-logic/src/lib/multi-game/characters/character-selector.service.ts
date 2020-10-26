import { Injectable } from '@angular/core';
import { of, ReplaySubject, Observable } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { CharactersInRoomService } from './characters-in-room.service';

@Injectable()
export class CharacterSelectorService {
  private activePlayers$: ReplaySubject<string[]> = new ReplaySubject();
  private playersWhoDone$: ReplaySubject<string[]> = new ReplaySubject();
  private avaiableNextPlayersInRound$: ReplaySubject<string[]> = new ReplaySubject();
  private nextPlayer$: ReplaySubject<string> = new ReplaySubject();

  constructor(
    private charactersInRoomService: CharactersInRoomService
  ) {
    this.charactersInRoomService.getPlayers()
      .pipe(
        map(players => players.filter(p => p.active == true)),
        map(players => players.map(p => p.playerID))
      )
      .subscribe(this.activePlayers$);

    this.playersWhoDone$
      .pipe(
        withLatestFrom(this.activePlayers$),
        map(selectAvaiableNextPlayers)
      ).subscribe(this.avaiableNextPlayersInRound$);
  }

  getNextPlayer(): Observable<string> {
    return this.nextPlayer$.asObservable();
  }

  getActivePlayersNumber(): Observable<number> {
    return this.activePlayers$.pipe(map(players => players.length));
  }

  getAvaiableNextPlayers(): Observable<number> {
    return this.avaiableNextPlayersInRound$.pipe(map(players => players.length));
  }

  playerFinishRound(playerId: string): void {
    of(playerId)
      .pipe(
        withLatestFrom(this.playersWhoDone$),
        map(([playerId, players]) => [playerId, ...players]),
        take(1)
      )
      .subscribe(this.playersWhoDone$);
  }

  selectNextPlayer(): void {
    this.avaiableNextPlayersInRound$
      .pipe(
        map(players => players[Math.floor(Math.random() * players.length)]),
        take(1)
      ).subscribe(this.nextPlayer$);
  }
}

const selectAvaiableNextPlayers = ([playersWhoDone, activePlayers]: [string[], string[]]): string[] => {
  const avaiableNextPlayersInRound: string[] = [];
  activePlayers.forEach(p => {
    const player = playersWhoDone.find(done => p == done)
    if (player == undefined) {
      avaiableNextPlayersInRound.push(player);
    }
  });

  return avaiableNextPlayersInRound;
}
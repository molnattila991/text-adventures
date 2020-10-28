import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomModel } from '@text-adventures/shared';
import { of, ReplaySubject, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';
import { CharactersInRoomService } from '../../characters/characters-in-room.service';

@Injectable()
export class CharacterSelectorService {
  private activePlayers$: ReplaySubject<string[]> = new ReplaySubject();
  private playersWhoDone$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private avaiableNextPlayersInRound$: ReplaySubject<string[]> = new ReplaySubject();
  private nextPlayer$: ReplaySubject<string> = new ReplaySubject();

  constructor(
    private charactersInRoomService: CharactersInRoomService,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) protected dataProvider: IGenericCrudDataProvider<RoomModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoom: ISelectedItemService<RoomModel>
  ) {
    this.selectedRoom.getSelectedItem()
      .pipe(take(1))
      .subscribe((room) => {
        room.currentPlayerID = "";
        this.dataProvider.update(room.id, room);
      })

    this.charactersInRoomService.getPlayers()
      .pipe(
        map(players => players.filter(p => p.active == true)),
        map(players => players.map(p => p.playerID))
      )
      .subscribe(this.activePlayers$);

    this.nextPlayer$.pipe(
      withLatestFrom(this.selectedRoom.getSelectedItem())
    ).subscribe(([p, room]) => {
      room.currentPlayerID = p;
      this.dataProvider.update(room.id, room);
    });

    this.nextPlayer$
      .pipe(
        filter(p => p != undefined),
        withLatestFrom(this.playersWhoDone$),
        map(([playerId, players]) => {
          return [playerId, ...players]
        })
      )
      .subscribe(v => {
        this.playersWhoDone$.next(v);
      });

    combineLatest([
      this.playersWhoDone$,
      this.activePlayers$
    ]).pipe(
      map(selectAvaiableNextPlayers)
    ).subscribe(v => {
      this.avaiableNextPlayersInRound$.next(v);
    });
  }

  getActivePlayersNumber(): Observable<number> {
    return this.activePlayers$.pipe(map(players => players.length));
  }

  getAvaiableNextPlayers(): Observable<number> {
    return this.avaiableNextPlayersInRound$.pipe(map(players => players.length));
  }

  reset(): void {
    this.playersWhoDone$.next([]);
  }

  selectNextPlayer(): void {
    of("")
      .pipe(
        withLatestFrom(this.avaiableNextPlayersInRound$),
        take(1),
        map(([action, players]) => {
          return players[Math.floor(Math.random() * players.length)]
        }),
      ).subscribe(v => {
        this.nextPlayer$.next(v)
      });
  }
}

const selectAvaiableNextPlayers = ([playersWhoDone, activePlayers]: [string[], string[]]): string[] => {
  const avaiableNextPlayersInRound: string[] = [];
  activePlayers.forEach(p => {
    const player = playersWhoDone.find(done => p == done)
    if (player == undefined) {
      avaiableNextPlayersInRound.push(p);
    }
  });
  return avaiableNextPlayersInRound;
}
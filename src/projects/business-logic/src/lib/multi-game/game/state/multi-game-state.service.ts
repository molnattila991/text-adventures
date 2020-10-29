import { state } from '@angular/animations';
import { Inject, Injectable } from '@angular/core';
import {
  BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider,
  MultiGameRoomState, MultiGameState, RoomModel
} from '@text-adventures/shared';
import { ReplaySubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';


@Injectable()
export class MultiGameStateService {
  private gameState$: ReplaySubject<MultiGameRoomState> = new ReplaySubject();
  private incrementRound$: Subject<void> = new Subject();
  private incrementTurn$: Subject<void> = new Subject();

  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.MultiGameStateDataProviderService) protected dataProvider: IGenericCrudDataProvider<MultiGameRoomState>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>
  ) {
    this.selectedRoomService.getSelectedItem()
      .pipe(
        switchMap(item => this.dataProvider.getFiltered("roomId", item.id, "=="))
      ).subscribe(item => {
        if (item.length > 0) {
          const selectedItem = item[0].model;
          selectedItem && this.gameState$.next(selectedItem);
        }
      });

    this.gameState$.subscribe(v => {
      console.log("multiGameState MultiGameStateService", v);
    });

    this.gameState$
      .pipe(take(1))
      .subscribe(state => {
        console.log("reset multiGameState MultiGameStateService");

        state.state = MultiGameState.waitForStart;
        state.round = 0;
        state.turn = 0;
        this.dataProvider.update(state.id, state);
      });

    this.incrementTurn$.pipe(
      withLatestFrom(this.gameState$),
      take(1)
    ).subscribe(([action, state]) => {
      if (state.turn == undefined) {
        state.turn = 0;
      } else {
        state.turn += 1;
      }

      this.dataProvider.update(state.id, state);
    });

    this.incrementRound$.pipe(
      withLatestFrom(this.gameState$),
      take(1)
    ).subscribe(([action, state]) => {
      if (state.round == undefined) {
        state.round = 0;
      } else {
        state.round += 1;
      }

      if (state.turn == undefined) {
        state.turn = 0;
      } else {
        state.turn += 1;
      }

      this.dataProvider.update(state.id, state);
    });
  }

  setState(state: MultiGameState): void {
    of(state).pipe(
      withLatestFrom(this.gameState$),
      take(1)
    ).subscribe(([action, state]) => {
      state.state = action;
      this.dataProvider.update(state.id, state);
    });
  }

  incrementRoundNumber(): void {
    this.incrementRound$.next();
  }

  incrementTurnNumber(): void {
    this.incrementTurn$.next();
  }

  get(): Observable<MultiGameRoomState> {
    return this.gameState$.asObservable();
  }

  getState(): Observable<MultiGameState> {
    return this.gameState$.pipe(map(item => item.state));
  }

  getRoundNumber(): Observable<number> {
    return this.gameState$.pipe(map(item => item.round));
  }
}

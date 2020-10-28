import { state } from '@angular/animations';
import { Inject, Injectable } from '@angular/core';
import {
  BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider,
  MultiGameRoomState, MultiGameState, RoomModel
} from '@text-adventures/shared';
import { ReplaySubject, Observable, of } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';


@Injectable()
export class MultiGameStateService {
  private gameState$: ReplaySubject<MultiGameRoomState> = new ReplaySubject();
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
      console.log(v);
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
    of("").pipe(
      withLatestFrom(this.gameState$),
      take(1)
    ).subscribe(([action, state]) => {
      if (state.round)
        state.round += 1;
      else
        state.round = 0;
      this.dataProvider.update(state.id, state);
    });
  }

  incrementTurnNumber(): void {
    of("").pipe(
      withLatestFrom(this.gameState$),
      take(1)
    ).subscribe(([action, state]) => {
      if (state.turn)
        state.turn += 1;
      else
        state.turn = 0;
      this.dataProvider.update(state.id, state);
    });
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

import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, GameMessage, IGenericCrudDataProvider, MultiGameLogs, RoomModel } from '@text-adventures/shared';
import { map, switchMap } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class MultiGameLoggerService {
  private selectedItem$: ReplaySubject<MultiGameLogs> = new ReplaySubject();
  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomLogsDataProviderService) private dataProvider: IGenericCrudDataProvider<MultiGameLogs>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>

  ) {

    this.selectedRoomService.getSelectedItem()
      .pipe(
        switchMap(item => this.dataProvider.getFiltered("roomId", item.id, "=="))
      ).subscribe(item => {
        if (item.length > 0) {
          const selectedItem = item[0].model;
          selectedItem && this.selectedItem$.next(selectedItem);
        }
      });
  }

  public getLogs(): Observable<GameMessage[]> {
    return this.selectedItem$.pipe(map(i => i.actual));
  }
}

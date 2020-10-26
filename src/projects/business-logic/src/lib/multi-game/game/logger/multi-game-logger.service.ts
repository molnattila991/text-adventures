import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutput, CommandOutputMessage, DATA_PROVIDER_INJECTION_TOKEN, GameMessage, IGenericCrudDataProvider, MultiGameLogs, RoomModel } from '@text-adventures/shared';
import { map, switchMap } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class MultiGameLoggerService implements CommandOutput {
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
  push(logs: CommandOutputMessage[]): void {
    throw new Error('Method not implemented.');
  }
  pushText(logs: string[]) {
    throw new Error('Method not implemented.');
  }
  pushHelp(command: string): void {
    throw new Error('Method not implemented.');
  }
  pushAndFlush(logs: CommandOutputMessage[]): void {
    throw new Error('Method not implemented.');
  }
  flush(): void {
    throw new Error('Method not implemented.');
  }
  get(): Observable<CommandOutputMessage[]> {
    return this.selectedItem$.pipe(map(i => i.actual));
  }
  getFull(): Observable<CommandOutputMessage[]> {
    return this.selectedItem$.pipe(map(i => i.all));
  }

}

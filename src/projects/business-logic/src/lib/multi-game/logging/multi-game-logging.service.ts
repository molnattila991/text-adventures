import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutput, CommandOutputMessage, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, MultiGameLogs, RoomModel } from '@text-adventures/shared';
import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs';
import { withLatestFrom, map, switchMap, take } from 'rxjs/operators';
import { ISelectedItemService } from '../../selected-item/selected-item-service';

@Injectable()
export class MultiGameLoggingService implements CommandOutput {
  private index: number = 0;
  private tempLogs$: BehaviorSubject<CommandOutputMessage[]> = new BehaviorSubject([]);
  private addTempLogs$: Subject<CommandOutputMessage[]> = new Subject();
  private flush$: Subject<void> = new Subject();
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

    this.selectedItem$
      .pipe(take(1))
      .subscribe(item => {
        //console.log("reset multiGameState MultiGameStateService");
        item.all = [];
        item.actual = [];

        this.dataProvider.update(item.id, item);
      });

    this.addTempLogs$.pipe(
      withLatestFrom(
        this.tempLogs$
      ),
      map(([add, logs]) => {
        return [...logs, ...add]
      })
    ).subscribe(this.tempLogs$);

    this.flush$.pipe(
      withLatestFrom(
        this.tempLogs$,
        this.selectedItem$
      )
    ).subscribe(([flush, logs, log]) => {
      log.actual = logs;
      log.all = [...log.all, ...logs];

      this.tempLogs$.next([]);
      this.dataProvider.update(log.id, log);
    });
  }

  pushHelp(command: string): void {
    throw new Error('Method not implemented.');
  }

  pushText(logs: string[]) {
    this.push(logs.map(l => { return { message: l } }));
  }

  push(logs: CommandOutputMessage[]): void {
    this.addTempLogs$.next(logs.map(l => {
      return { ...l, index: ++this.index };
    }));
  }
  flush(): void {
    this.flush$.next();
  }
  pushAndFlush(logs: CommandOutputMessage[]): void {
    this.push(logs);
    this.flush();
  }

  get(): Observable<CommandOutputMessage[]> {
    return this.selectedItem$.pipe(map(item => item.actual));
  }

  getFull(): Observable<CommandOutputMessage[]> {
    return this.selectedItem$.pipe(map(item => item.all));
  }
}

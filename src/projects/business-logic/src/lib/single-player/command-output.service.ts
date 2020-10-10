import { Injectable } from '@angular/core';
import { CommandOutput } from '@text-adventures/shared';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CommandOutputMessage } from '../../../../shared/src/lib/business-logic/command-output.interface';

@Injectable()
export class CommandOutputService implements CommandOutput {
  private index: number = 0;
  private fullOutput$: BehaviorSubject<CommandOutputMessage[]> = new BehaviorSubject([]);
  private actualOutput$: BehaviorSubject<CommandOutputMessage[]> = new BehaviorSubject([]);
  private tempLogs$: BehaviorSubject<CommandOutputMessage[]> = new BehaviorSubject([]);
  private addTempLogs$: Subject<CommandOutputMessage[]> = new Subject();
  private flush$: Subject<void> = new Subject();

  constructor() {
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
        this.tempLogs$
      ),
      map(([flush, logs]) => [...logs])
    ).subscribe(this.actualOutput$);

    this.flush$.subscribe(() => this.tempLogs$.next([]));

    this.flush$.pipe(
      withLatestFrom(
        this.tempLogs$,
        this.fullOutput$
      ),
      map(([flush, logs, allLogs]) => [...allLogs, ...logs])
    ).subscribe(this.fullOutput$);
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
    return this.actualOutput$.asObservable();
  }

  getFull(): Observable<CommandOutputMessage[]> {
    return this.fullOutput$.asObservable();
  }
}

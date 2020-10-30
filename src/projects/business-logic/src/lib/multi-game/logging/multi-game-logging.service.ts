import { Injectable } from '@angular/core';
import { CommandOutput, CommandOutputMessage } from '@text-adventures/shared';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable()
export class MultiGameLoggingService implements CommandOutput {
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
  
  pushHelp(command: string): void {
    this.pushText(["Segítségért üsd be a 'help " + command + "' parancsot."]);
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

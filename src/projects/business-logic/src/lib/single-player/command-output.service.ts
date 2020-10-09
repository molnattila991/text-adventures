import { Injectable } from '@angular/core';
import { CommandOutput } from '@text-adventures/shared';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandOutputService implements CommandOutput {
  private fullOutput$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private actualOutput$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private tempLogs$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private addTempLogs$: Subject<string[]> = new Subject();
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

  push(logs: string[]): void {
    this.addTempLogs$.next(logs);
  }
  flush(): void {
    this.flush$.next();
  }
  pushAndFlush(logs: string[]): void {
    this.push(logs);
    this.flush();
  }

  get(): Observable<string[]> {
    return this.actualOutput$.asObservable();
  }

  getFull(): Observable<string[]> {
    return this.fullOutput$.asObservable();
  }
}

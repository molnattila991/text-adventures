import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputMessage, CommandOutputRead } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';
import { merge } from 'rxjs/operators';

@Injectable()
export class MultiGameMergeLogsService implements CommandOutputRead {
  private logs$: ReplaySubject<CommandOutputMessage[]> = new ReplaySubject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) public singleOutPut: CommandOutputRead,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.MultiGameLoggingService) public multiOutPut: CommandOutputRead,
  ) {

    this.singleOutPut.get()
      .pipe(merge(this.multiOutPut.get()))
      .subscribe(this.logs$)
  }

  get(): Observable<CommandOutputMessage[]> {
    return this.logs$.asObservable();
  }
  
  getFull(): Observable<CommandOutputMessage[]> {
    throw new Error('Method not implemented.');
  }
}

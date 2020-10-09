import { Observable } from 'rxjs';

export interface CommandOutput extends CommandOutputWrite, CommandOutputRead {

}

export interface CommandOutputWrite {
    push(logs: string[]): void;
    pushAndFlush(logs: string[]): void;
    flush(): void;
}

export interface CommandOutputRead {
    get(): Observable<string[]>
    getFull(): Observable<string[]>
}
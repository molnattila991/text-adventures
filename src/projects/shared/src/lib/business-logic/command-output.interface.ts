import { Observable } from 'rxjs';

export enum CommandOutputType {
    Story, StoryItem, Item, Attribute, Skill, Character
}

export interface CommandOutputMessage {
    message: string;
    index?: number;
    id?: string | number;
    type?: CommandOutputType;
}

export interface CommandOutput extends CommandOutputWrite, CommandOutputRead {

}

export interface CommandOutputWrite {
    push(logs: CommandOutputMessage[]): void;
    pushText(logs: string[]);
    pushHelp(command: string): void;
    pushAndFlush(logs: CommandOutputMessage[]): void;
    flush(): void;
}

export interface CommandOutputRead {
    get(): Observable<CommandOutputMessage[]>
    getFull(): Observable<CommandOutputMessage[]>
}
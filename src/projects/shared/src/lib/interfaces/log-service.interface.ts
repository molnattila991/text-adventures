import { Observable } from "rxjs";
import { GameMessage, MessageType } from "../models-game/action-result.interface";

export interface ILogService {
  flush(): void;
  messages(): Observable<GameMessage[]>;
  getNewMessages(): Observable<GameMessage[]>;
  notifications(messageType: MessageType): Observable<number>;
  notificationsNew(messageType: MessageType): Observable<number>;
  setMessageToOpened(number: number);
  addMessage(message: GameMessage | GameMessage[]): ILogService;
}

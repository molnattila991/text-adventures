export enum MessageType {
  requirement,
  inventory,
  items,
  attributes,
  log,
  error,
  information,
  success
}

export enum MessageStatus {
  new,
  seen,
  closed
}

export interface GameMessage {
  type: MessageType;
  message: string;
  status: MessageStatus;
  number: number;
}

export interface ActionResult<T> {
  object: T;
  messages: GameMessage[];
}

export interface ActionResultBin<T> {
  source: T;
  target: T;
  messages: GameMessage[];
}

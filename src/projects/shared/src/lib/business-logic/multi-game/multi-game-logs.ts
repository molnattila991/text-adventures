import { CommandOutputMessage } from '..';

export interface MultiGameLogs {
  all: CommandOutputMessage[],
  actual: CommandOutputMessage[];
  roomId: string;
  id: string;
}
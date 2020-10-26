import { GameMessage } from '../../models-game/action-result.interface';

export interface MultiGameLogs {
  all: GameMessage[],
  actual: GameMessage[];
  roomId: string;
  id: string;
}
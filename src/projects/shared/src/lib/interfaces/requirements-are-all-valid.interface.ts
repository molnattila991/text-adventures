import { GameMessage } from "../models-game/action-result.interface";

export interface RequirementsAreAllValid {
  valid: boolean;
  messages: GameMessage[];
}

import { UsableGameObject } from './../../models-game/usable-game-object.interface';
import { GameMessage } from '../../models-game/action-result.interface';
import { CharacterModel } from '../../models-game/character-model';
export interface CharacterBattleActions {
  attackTarget(
    source: CharacterModel,
    target: CharacterModel,
    usableItemObject: UsableGameObject
  ): { sourceObject: CharacterModel, targetObject: CharacterModel, messages: GameMessage[] };
}
